import { createEffect, createStore, createEvent } from 'effector';

import { addQueryParams } from '@/shared/lib/url//addQueryParams';

import { fetchRepositories } from '../api/fetchRepositories';

import type { FetchRepositoryResponse } from './types';

export const $repositories = createStore<FetchRepositoryResponse['edges']>([]);
export const $pageCursors = createStore(new Map());
export const $totalCount = createStore(0);
export const $loading = createStore(false);
export const $error = createStore<Error | null>(null);


const updatePageCursors = createEvent<{ page: number; pageInfo: FetchRepositoryResponse['pageInfo'] }>();
const updateTotalCount = createEvent();

$totalCount.on(updateTotalCount, (_, totalCount) => totalCount);
$pageCursors.on(updatePageCursors, (cursorsMap, { page, pageInfo }) => {
  cursorsMap.set('startCursor', pageInfo.startCursor);
  cursorsMap.set('endCursor', pageInfo.endCursor);
  cursorsMap.set(page, pageInfo.startCursor);
  cursorsMap.set(page + 1, pageInfo.endCursor);
  return cursorsMap;
});

export const fetchRepositoriesFx = createEffect(async ({ queryString, page = 1, startCursor }: { queryString: string; page?: number; startCursor?: string }) => {
  // addQueryParams({ search: queryString, page: String(page), startCursor });
  addQueryParams({ search: queryString });

  const cursorsMap = $pageCursors.getState();
  const isSavedActiveCursor = cursorsMap.has(startCursor);

  // Выполняем запрос к GraphQL API с переданными переменными
  const response = await fetchRepositories(queryString, isSavedActiveCursor ? cursorsMap.get(page) : startCursor);

  const search = response.data.search;
  const pageInfo = search.pageInfo;

  updatePageCursors({ page, pageInfo });
  updateTotalCount(search.repositoryCount);

  return search;
});

$loading.on(fetchRepositoriesFx.pending, (_, pending) => pending);
$error.on(fetchRepositoriesFx.failData, (_, error) => error);
$error.reset(fetchRepositoriesFx.done);

// Обновляем стор при успешном выполнении эффекта
$repositories.on(fetchRepositoriesFx.doneData, (_, repositories) => repositories.edges);
