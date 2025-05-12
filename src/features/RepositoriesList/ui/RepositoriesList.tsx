import React, { useCallback, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router";
import { useUnit } from 'effector-react';

import { getQueryParams, Options } from '@/shared/lib/url/getQueryParams';
import { getRepositoryInfo } from '@/shared/const/router';
import { toShortFormatDate } from '@/shared/lib/date';
import { VStack, HStack } from '@/shared/ui/Stack';
import { SearchBar } from '@/shared/ui/SearchBar';
import { useDebounce } from '@/shared/lib/hooks';
import { StarIcon } from '@/shared/assets/icons';
import { Avatar } from '@/shared/ui/Avatar';
import { Header } from '@/widgets/Header';

import { $user } from '../../SignIn/model/store';
import { fetchRepositoriesFx, $repositories, $error, $loading } from '../model/store';
import type { Repository } from '../model/types'

import css from './styles.module.css';

const queryOptions: Options = {
  search: { type: 'string' },
};

export const RepositoriesList: React.FC = () => {
  const navigate = useNavigate();

  const params = getQueryParams<{ search: string }>(queryOptions);

  const userData = useUnit($user);
  const repositories = useUnit($repositories);
  const loading = useUnit($loading);
  const error = useUnit($error);

  const [value, setValue] = useState(params.search);

  const fetchRepositories = useDebounce((searchValue: string) => {
    fetchRepositoriesFx({ queryString: searchValue || `user:${userData.login}`, page: 1 });
  }, 500);

  useEffect(() => {
    fetchRepositories(value);
  }, [value]);

  const goToRepositoryInfoPage = useCallback((owner: string, name: string) => () => {
    navigate(getRepositoryInfo(owner, name))
  }, [navigate]);

  const renderRepositories = () => {
    if (loading) return <HStack justify="center">Загрузка...</HStack>;
    if (error) return <HStack justify="center">Ошибка загрузки списка репозиториев! {error.message}</HStack>;

    return repositories.map(({ node } : { node: Repository}) => (
      <VStack key={node.id} className={css.repositoryContainer} onClick={goToRepositoryInfoPage(node.owner.login, node.name)} role="button">
        <HStack className={css.titleBlock} gap='16'>
          <Avatar src={node.owner.avatarUrl} alt={node.owner.login} />
          <div className={css.title}>{node.name}</div>
        </HStack>
        <HStack className={css.titleBlock} gap="8">
          <HStack className={css.starsBlock}>
            <StarIcon className={css.starsIcon} />
            <div>{node.stargazerCount}</div>
          </HStack>
          <div>Updated on {toShortFormatDate(node.updatedAt)}</div>
          <Link className={css.link} to={node.url} target='_blank' onClick={(e) => e.stopPropagation()}>
            Github link
          </Link>
        </HStack>
      </VStack>
    ))
  }

  return (
    <VStack className={css.repositoriesList} gap="16" max>
      <Header>
        <SearchBar value={value} onChange={setValue} max />
      </Header>
      {renderRepositories()}
    </VStack>
  );
}
