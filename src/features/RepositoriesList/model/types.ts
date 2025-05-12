export interface FetchRepositoryResponse {
	edges: { node: Repository }[];
  pageInfo: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string;
    endCursor: string;
  };
  repositoryCount: number;
}

export interface Repository {
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