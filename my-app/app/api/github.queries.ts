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

export const GET_HEATMAP = gql`
  query ($username: String! , $from: DateTime! , $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

            // <div className="hidden lg:flex flex-col gap-[3px]">
            //   {grid.map((row, ri) => (
            //     <div key={ri} className="flex gap-[3px]">
            //       {row.map((level, ci) => (
            //         <div
            //           key={ci}
            //           className={`size-[10px] rounded-[2px] ${gridColor(level)}`}
            //         />
            //       ))}
            //     </div>
            //   ))}
            // </div>