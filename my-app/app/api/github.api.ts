import githubRequest from "./client";
import { GET_GITHUB_USER } from "./github.queries";
import { GET_GITHUB_REPOS } from "./github.queries";
import type { GithubUser, GithubRepo } from "./types";

export function getGithubUser(username: string) {
  return githubRequest<{user: GithubUser}>
  (GET_GITHUB_USER, { username });
}

export function getGithubRepos(username: string, limit = 20) {
  return githubRequest<{
    user: {
      repositories: {
        nodes: GithubRepo[];
      };
    };
  }>
  (GET_GITHUB_REPOS, { username, limit });
}
