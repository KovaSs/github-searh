import { gql } from '@apollo/client';

export const GET_REPOS = gql`
  query($queryString:String!, $page:String) {
    search(query:$queryString, type:REPOSITORY, first:10, after:$page) {
      repositoryCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          ... on Repository {
            id
            name
            stargazerCount
            url
            updatedAt
            owner {
              login
              avatarUrl
            }
            languages(first:5) {
              nodes {
                name
              }
            }
            description
          }
        }
      }
    }
  }
`;