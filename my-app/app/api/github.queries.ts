import { gql} from "@apollo/client";

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