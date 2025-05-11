import React, { useCallback } from 'react';
import { Link, useNavigate } from "react-router";
import { useQuery } from '@apollo/client';

import { getRepositoryInfo } from '@/shared/const/router';
import { StarIcon } from '@/shared/assets/icons';

import { TOP_REPOS, GET_USER } from '../services/getRepositories'

import css from './styles.module.css'

interface Repository {
  stargazerCount: number;
	updatedAt: string;
	name: string;
  url: string;
	id: string;
  owner: {
    avatarUrl: string;
    login: string;
  }
}

const toShortFormatDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
  return formattedDate;
}

export const RepositoriesList: React.FC = () => {
  const navigate = useNavigate();

  const { loading: userLoading, error: userError, data: userData, called: userCalled } = useQuery(GET_USER);

  const userLogin = userData?.viewer?.login;

  const { loading, error, data } = useQuery(TOP_REPOS, {
    skip: !userCalled,
		variables: {
			queryString: `user:${userLogin}`,
			// page: '1',
		}
	});


  const goToRepositoryInfoPage = useCallback((owner: string, name: string) => () => {
    navigate(getRepositoryInfo(owner, name))
  }, [navigate]);

  if (userLoading || loading) return <p>Загрузка...</p>;
  if (userError) return <p>Ошибка загрузки юзера! {userError.message}</p>;
  if (error) return <p>Ошибка загрузки списка репозиториев! {error.message}</p>;

	console.log('dataUser', userData);
	console.log('data', data);

  return (
    <div className={css.repositoriesList}>
      {data.search.edges.map(({ node } : { node: Repository}) => (
        <div key={node.id} className={css.repositoryContainer} onClick={goToRepositoryInfoPage(node.owner.login, node.name)}>
          <div className={css.titleBlock}>
            <img className={css.avatar} src={node.owner.avatarUrl} alt={node.owner.login} />
            <div className={css.title}>{node.name}</div>
          </div>
          <div className={css.titleBlock}>
            <div className={css.starsBlock}>
              <StarIcon className={css.starsIcon} />
              <div>{node.stargazerCount}</div>
            </div>
            <div>Updated on {toShortFormatDate(node.updatedAt)}</div>
            <Link className={css.link} to={node.url} target='_blank'>
              Github link
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
