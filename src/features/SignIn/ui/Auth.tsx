import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';

import { mainPagePath } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';

import { fetchUserFx, $error } from '../model/store';

import cls from './styles.module.css';

export const Auth: React.FC = () => {
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState('');

  const error = useUnit($error);

  const onAuth = () => {
    localStorage.setItem('token', authToken);
    fetchUserFx()
    .then(() => {
      navigate(mainPagePath)
    })
    .catch(() => {
      localStorage.removeItem('token');
    });
  }

  return (
    <VStack  align="center">
      <h1>Для получения доступа к функционалу введите github token</h1>
      <VStack className={cls.signinContainer}>
        <VStack justify="center">
          <p>Чтобы получить авторизационный токен для GitHub GraphQL API, вам нужно выполнить несколько шагов. Вот пошаговая инструкция:</p>

          <h2>Шаг 1: Войдите в свой аккаунт Git3ub</h2>
          <p>Перейдите на GitHub и войдите в свой аккаунт.</p>

          <h2>Шаг 2: Перейдите в настройки</h2>
          <p>Нажмите на свой аватар в правом верхнем углу страницы.</p>
          <p>Выберите "Settings" (Настройки) из выпадающего меню.</p>

          <h2>Шаг 3: Перейдите в раздел "Developer settings"</h2>
          <p>В левой боковой панели прокрутите вниз и выберите "Developer settings".</p>
          <p>Затем выберите "Personal access tokens".</p>

          <h2>Шаг 4: Создайте новый токен</h2>
          <p>Нажмите на кнопку "Generate new token" (Создать новый токен).</p>
          <p>Вам будет предложено ввести описание для токена (например, "GraphQL API Token").</p>
          <p>Установите срок действия токена (по умолчанию он будет без срока действия, но вы можете установить срок, если хотите).</p>
          <p>Выберите необходимые разрешения (scopes) для вашего токена. Для работы с GraphQL API вам могут понадобиться следующие разрешения:</p>
          <p>repo — доступ к репозиториям.</p>
          <p>read:user — доступ к информации о пользователе.</p>
          <p>Другие разрешения в зависимости от того, что вы хотите делать с API.</p>

          <h2>Шаг 5: Введите полученый токен в приложение</h2>
          <p>После того как вы настроили все параметры, нажмите кнопку "Generate token". Важно! Скопируйте токен и сохраните его в безопасном месте, так как вы не сможете увидеть его снова после закрытия страницы.</p>
        </VStack>
        <VStack justify="center" align="center" gap="16" max>
          <Input value={authToken} onChange={setAuthToken} max />
          {error && <HStack className={cls.error}>{error.message}</HStack>}
          <button onClick={onAuth}>Авторизоваться</button>
        </VStack>
      </VStack>
    </VStack>
  );
}
