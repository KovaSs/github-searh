export interface Language {
  node: { name: string };
  size: number
}

export interface Repository {
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