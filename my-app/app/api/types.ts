export interface GithubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  url: string;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  repositories: {
    totalCount: number;
  };
}

export interface GithubRepo {
  name: string;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  createdAt: string;
  primaryLanguage: {
    name: string;
  } | null;
  languages: {
    nodes: {
      name: string;
    }[];
  };
}
