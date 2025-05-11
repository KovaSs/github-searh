import { gql } from '@apollo/client';

export const GET_REPOSITORY = gql`
query GetRepository($name: String!, $owner: String!) {
	repository(name: $name, owner: $owner) {
		stargazerCount
		description
		pushedAt
		name
		owner {
			avatarUrl
			login
			url
		}
		languages(first:10) {
			edges {
				node {
					name
				}
				size
			}
		}
	}
}
`;