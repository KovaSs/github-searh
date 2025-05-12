import { createEffect, createStore } from 'effector';

import { fetchRepository } from '../api/fetchRepositories';

import type { Repository } from './types';

export const fetchRepositoryInfoFx = createEffect(async (props: Record<'owner' | 'name', string>) => {
  // Выполняем запрос к GraphQL API с переданными переменными
  const response = await fetchRepository(props);
  return response.data.repository;
});

// Создаем стор для хранения данных о репозиториях
export const $repository = createStore<Repository | null>(null);
// Создаем стор для отслеживания статуса загрузки
export const $loading = createStore(false);
// Создаем стор для отслеживания ошибок
export const $error = createStore<Error | null>(null);

$loading.on(fetchRepositoryInfoFx.pending, (_, pending) => pending);
$error.on(fetchRepositoryInfoFx.failData, (_, error) => error);
$error.reset(fetchRepositoryInfoFx.done);

// Обновляем стор при успешном выполнении эффекта
$repository.on(fetchRepositoryInfoFx.doneData, (_, repositories) => repositories);