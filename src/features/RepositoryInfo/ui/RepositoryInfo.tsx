import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Link } from "react-router";


import { GET_REPOSITORY } from "../services/getRepositoryInfo";

interface Language {
  node: { name: string };
  size: number
}

interface Repository {
  stargazerCount: number;
  description: string | null;
  pushedAt: string;
  name: string;
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

  console.log("params", params);

  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { owner: params.owner, name: params.name },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { repository } = data as { repository: Repository };
  const { name, stargazerCount, pushedAt, owner, languages, description } = repository;

  console.log("repository", repository);

  return (
    <div>
      <div>
        <div>{`Название репозитория: ${name}` }</div>
        <div>{`Кол-во звёзд на github: ${stargazerCount}` }</div>
        <div>{`Дата последнего коммита: ${pushedAt}` }</div>
      </div>
      <div>
        <img src={owner.avatarUrl} alt={owner.login} />
        <Link className={'css.link'} to={owner.url} target='_blank'>
          {params.owner}
        </Link>
      </div>
      <div>
        {languages.edges.map(({ node }) => (
          <div key={node.name}>{node.name}</div>
        ))}
      </div>
      <div>
        <div>Описание:</div>
        <div>{description}</div>
      </div>
    </div>
  );
};
