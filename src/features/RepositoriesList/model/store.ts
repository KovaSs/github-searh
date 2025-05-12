import { createEffect, createStore } from 'effector';

import { addQueryParams } from '@/shared/lib/url//addQueryParams';

import { fetchRepositories } from '../api/fetchRepositories';

import type { FetchRepositoryResponse } from './types';

export const fetchRepositoriesFx = createEffect(async ({ queryString, page = 1 }: { queryString: string; page: number }) => {
  addQueryParams({ search: queryString, page: String(page) });
  // Выполняем запрос к GraphQL API с переданными переменными
  const response = await fetchRepositories(queryString, page);

  return response.data.search;
});

// Создаем стор для хранения данных о репозиториях
export const $repositories = createStore<FetchRepositoryResponse['edges']>([]);
// Создаем стор для отслеживания статуса загрузки
export const $loading = createStore(false);
// Создаем стор для отслеживания ошибок
export const $error = createStore<Error | null>(null);

$loading.on(fetchRepositoriesFx.pending, (_, pending) => pending);
$error.on(fetchRepositoriesFx.failData, (_, error) => error);
$error.reset(fetchRepositoriesFx.done);

// Обновляем стор при успешном выполнении эффекта
$repositories.on(fetchRepositoriesFx.doneData, (_, repositories) => repositories.edges);