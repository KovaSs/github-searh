import React from 'react';
import { useQuery, gql } from '@apollo/client';

const TOP_REPOS = gql`
	query GetTopRepos {
		search(query: "stars:>50000", type: REPOSITORY, first: 10) {
			nodes {
				... on Repository {
					id
					name
					url
					updatedAt
				}
			}
		}
	}
`;

interface Repository {
	updatedAt: string;
	name: string;
	id: string;
}


export const Repositories: React.FC = () => {
  const { loading, error, data } = useQuery(TOP_REPOS);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка! {error.message}</p>;

	console.log('data', data.search.nodes)

  return (
    <ul>
      {data.search.nodes.map((item : Repository) => (
        <li key={item.id}>
          <h3>{item.name}</h3>
          <p>Updated at: {new Date(item.updatedAt).toLocaleDateString()}</p>
        </li>
      ))}
    </ul>
  );
}
