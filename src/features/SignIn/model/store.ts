import { createEffect, createStore } from 'effector';

import { fetchUser } from '../api/fetchUser';

import { User } from './types';

const getUserLs = () => {
  return JSON.parse(String(localStorage.getItem('user')));
}

export const fetchUserFx = createEffect(async () => {
  // Выполняем запрос к GraphQL API с переданными переменными
  const response = await fetchUser();
  const user = response.data.viewer;
  localStorage.setItem('user', JSON.stringify(user));

  return user;
});

// Создаем стор для хранения данных о репозиториях
export const $user = createStore<User>(getUserLs());
// Создаем стор для отслеживания статуса загрузки
export const $loading = createStore(false);
// Создаем стор для отслеживания ошибок
export const $error = createStore<Error | null>(null);

$loading.on(fetchUserFx.pending, (_, pending) => pending);
$error.on(fetchUserFx.failData, (_, error) => error);
$error.reset(fetchUserFx.done);

// Обновляем стор при успешном выполнении эффекта
$user.on(fetchUserFx.doneData, (_, activeUser) => activeUser);