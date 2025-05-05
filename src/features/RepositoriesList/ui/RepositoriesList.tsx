import React, { useCallback } from 'react';
import { Link, useNavigate } from "react-router";
import { useQuery } from '@apollo/client';

import { getRepositoryInfo } from '@/shared/const/router';
import { StarIcon } from '@/shared/assets/icons';

import { TOP_REPOS } from '../services/getRepositories'

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

  const { loading, error, data } = useQuery(TOP_REPOS, {
		variables: {
			queryString: 'user:KovaSs',
			// page: '1',
		}
	});

  const goToRepositoryInfoPage = useCallback((owner: string, name: string) => () => {
    navigate(getRepositoryInfo(owner, name))
  }, [navigate]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка! {error.message}</p>;

	console.log('data', data)

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
