import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { cache } from "./cache";


export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    uri: 'http://localhost:4000/graphql'
  });