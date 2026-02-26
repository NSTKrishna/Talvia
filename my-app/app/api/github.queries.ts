import { gql } from "@apollo/client";

export const GET_GITHUB_USER = gql`
  query GetGithubUser($username: String!) {
    user(login: $username) {
      login
      name
      bio
      avatarUrl
      url
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories {
        totalCount
      }
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalPullRequestReviewContributions
        pullRequestContributionsByRepository(maxRepositories: 100) {
          repository {
            name
            owner {
              login
            }
          }
          contributions(first: 10) {
            totalCount
            nodes {
              pullRequest {
                state
                baseRepository {
                  owner {
                    login
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_GITHUB_REPOS = gql`
  query GetGithubRepos($username: String!, $limit: Int = 20) {
    user(login: $username) {
      repositories(
        first: $limit
        ownerAffiliations: OWNER
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        nodes {
          name
          url
          homepageUrl
          stargazerCount
          createdAt
          primaryLanguage {
            name
          }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;

export const TopReposByCommits = gql`
    query GetRepos($username: String!, $limit: Int!) {
    user(login: $username) {
        repositories(
        first: $limit
        orderBy: { field: UPDATED_AT, direction: DESC }
        ) {
        nodes {
            name
            defaultBranchRef {
            target {
                ... on Commit {
                history(first: 0) {
                    totalCount
                }
                }
            }
            }
        }
        }
    }
    }
`;