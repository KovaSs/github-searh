export interface FetchRepositoryResponse {
	edges: {
		node: Repository;
	}[];
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