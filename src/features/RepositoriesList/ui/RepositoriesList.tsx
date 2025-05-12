import React, { useCallback, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router";
import { useUnit } from 'effector-react';

import { getQueryParams } from '@/shared/lib/url/getQueryParams';
import { getRepositoryInfo } from '@/shared/const/router';
import { Pagination, PaginationItem } from '@/shared/ui/Pagination';
import { toShortFormatDate } from '@/shared/lib/date';
import { VStack, HStack } from '@/shared/ui/Stack';
import { Flex } from '@/shared/ui/Stack/Flex/Flex';
import { SearchBar } from '@/shared/ui/SearchBar';
import { useDebounce } from '@/shared/lib/hooks';
import { StarIcon } from '@/shared/assets/icons';
import { Avatar } from '@/shared/ui/Avatar';
import { Header } from '@/widgets/Header';

import { $user } from '../../SignIn/model/store';
import { fetchRepositoriesFx, $repositories, $error, $loading, $totalCount, $pageCursors } from '../model/store';
import type { Repository } from '../model/types'

import css from './styles.module.css';

const queryOptions = {
  startCursor: { type: 'string' },
  search: { type: 'string' },
  page: { type: 'number' },
} as const;

type TypeMapping = {
  string: string;
  number: number;
  boolean: boolean;
};

type QueryOptionTypes = {
  [K in keyof typeof queryOptions]: TypeMapping[typeof queryOptions[K]['type']];
};

const FT_PAGINATION = false;

export const RepositoriesList: React.FC = () => {
  const navigate = useNavigate();

  const params = getQueryParams<QueryOptionTypes>(queryOptions);

  const [ repositories, loading, error ] = useUnit([$repositories, $loading, $error]);
  const pageCursors = useUnit($pageCursors);
  const totalCount = useUnit($totalCount);
  const userData = useUnit($user);

  const [value, setValue] = useState(params.search);
  const [page, setPage] = useState(params.page);

  console.log('totalCount', totalCount, pageCursors);

  const fetchRepositories = useDebounce((queryString: string, page: number, startCursor: string) => {
    fetchRepositoriesFx({ startCursor, queryString, page });
  }, 500);

  useEffect(() => {
    fetchRepositories(value || `user:${userData.login}`, page, pageCursors.get('startCursor') || params.startCursor);
  }, [value, page]);

  const goToRepositoryInfoPage = useCallback((owner: string, name: string) => () => {
    navigate(getRepositoryInfo(owner, name))
  }, [navigate]);

  const onChangeSearch = useCallback((newValue: string) => {
    setValue(newValue);
    setPage(1);
  }, []);

  const onChangePageNumber = useCallback((newPageNumber: number) => () => {
    setPage(newPageNumber);
  }, []);

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

  const renderPagination = () => {
    if (!FT_PAGINATION) return null;

    const paginationItems =  new Array(Math.floor(totalCount / 10)).fill('').map((_, index) => {
      const counter = index + 1;
      const isDisabled = !pageCursors.has(counter);

      return (
        <PaginationItem
          onClick={onChangePageNumber(counter)}
          active={counter === params.page}
          disabled={isDisabled}
          key={index + 1}
        >
          {counter}
        </PaginationItem>
      )
    })

    return (
      <Pagination>
        {paginationItems}
      </Pagination>
    )
  }

  return (
    <VStack className={css.repositoriesList} gap="16" max>
      <Header>
        <SearchBar value={value} onChange={onChangeSearch} max />
      </Header>
      {renderPagination()}
      {renderRepositories()}
    </VStack>
  );
}
