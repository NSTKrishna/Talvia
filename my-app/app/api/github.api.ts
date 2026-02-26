import githubRequest from "./client";
import {
  GET_GITHUB_USER,
  GET_GITHUB_REPOS,
  TopReposByCommits,
} from "./github.queries";
import type { GithubUser, GithubRepo, GithubCommit } from "./types";

export function getGithubUser(username: string) {
  return githubRequest<{ user: GithubUser }>(GET_GITHUB_USER, { username });
}

export function getGithubRepos(username: string, limit = 20) {
  return githubRequest<{
    user: {
      repositories: {
        nodes: GithubRepo[];
      };
    };
  }>(GET_GITHUB_REPOS, { username, limit });
}

export function getGithubCommit(username: string, limit: number) {
  return githubRequest<{
    user: GithubCommit;
  }>(TopReposByCommits, { username, limit });
}
