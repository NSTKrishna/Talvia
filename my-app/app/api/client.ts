import type { DocumentNode } from "graphql";
import { print } from "graphql";

const GITHUB_API = "https://api.github.com/graphql";
const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

console.log(TOKEN)

interface GraphQLResponse<T> {
  data: T;
}

async function githubRequest<T>( query: string | DocumentNode, variables: Record<string, unknown>,): Promise<GraphQLResponse<T>> {
  const queryString = typeof query === "string" ? query : print(query);

  const res = await fetch(GITHUB_API, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query: queryString, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("GitHub GraphQL error");
  }

  return json;
}

export default githubRequest;
