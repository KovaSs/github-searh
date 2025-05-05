import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../services/getRepositoryInfo'

export const RepositoryInfo: React.FC = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>();

  console.log('params', owner, name)

  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { owner, name }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { repository } = data;

  console.log('repository', repository);

  return (
    <div>RepositoryInfo</div>
  );
}
