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
  contributionsCollection: {
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    totalIssueContributions: number;
    totalPullRequestReviewContributions: number;
    pullRequestContributionsByRepository: {
      repository: {
        name: string;
        owner: {
          login: string;
        };
      };
      contributions: {
        totalCount: number;
        nodes: {
          pullRequest: {
            state: string;
            baseRepository: {
              owner: {
                login: string;
              };
            };
          };
        }[];
      };
    }[];
  };
  organizations?: {
    nodes: {
      login: string;
      name: string | null;
      avatarUrl: string;
      url: string;
    }[];
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

export interface GithubCommit {
  repositories: {
    nodes: {
      name: string;
      defaultBranchRef: {
        target: {
          __typename?: "Commit";
          history: {
            totalCount: number;
          };
        } | null;
      } | null;
    }[];
  } | null;
}


export interface GithubHeatmap {
  totalContributions: number;
  weeks: {
    contributionDays: {
      date: string;
      contributionCount: number;
    }[];
  }[];
}