import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUnit } from 'effector-react';
import { Link } from "react-router";

import { toShortFormatDate } from "@/shared/lib/date";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Avatar } from "@/shared/ui/Avatar";
import { Header } from "@/widgets/Header";

import { fetchRepositoryInfoFx, $repository, $error, $loading } from '../model/store';

import cls from "./styles.module.css";

interface Language {
  node: { name: string };
  size: number
}

interface Repository {
  stargazerCount: number;
  description: string | null;
  pushedAt: string;
  name: string;
  url: string;
  owner: {
    avatarUrl: string;
    login: string;
    url: string;
  };
  languages: {
    edges: Language[];
  };
}

export const RepositoryInfo: React.FC = () => {
  const params = useParams<{ owner: string; name: string }>();
  const navigate = useNavigate();

  const repository = useUnit($repository);
  const loading = useUnit($loading);
  const error = useUnit($error);

  useEffect(() => {
    if (params.owner && params.name) {
      fetchRepositoryInfoFx({ owner: params.owner, name: params.name });
    }
  }, []);

  const { stargazerCount, pushedAt, owner, languages, description, url } = repository as Repository || {};

  const goToBack = () => {
    navigate(-1);
  };

  const renderRepositoryInfo = () => {
    if (loading) return <HStack justify="center">Loading...</HStack>;
    if (error) return <HStack justify="center">Error: {error.message}</HStack>;

    return (
      <>
        <VStack>
          <div>{`Кол-во звёзд на github: ${stargazerCount}` }</div>
          <div>{`Дата последнего коммита: ${toShortFormatDate(pushedAt)}` }</div>
        </VStack>
        <VStack>
          <p>Languages</p>
          {languages?.edges.map(({ node }) => (
            <div key={node.name}>{node.name}</div>
          ))}
        </VStack>
        <VStack>
          <div>Описание:</div>
          <div>{description || 'No description, website, or topics provided.'}</div>
        </VStack>
      </>
    )
  }

  return (
    <VStack gap="16" max>
      <Header onClickIcon={goToBack}>
        <HStack className={cls.headerLinkContainer} gap="8">
          <Avatar src={owner?.avatarUrl} alt={owner?.login} />
          <Link className={cls.titleLink} to={owner?.url} target='_blank'>
            {params.owner}
          </Link>
          /
          <Link className={cls.titleLink} to={url} target='_blank'>
            {params.name}
          </Link>
        </HStack>
      </Header>
      {renderRepositoryInfo()}
    </VStack>
  );
};
