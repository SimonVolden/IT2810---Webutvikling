import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { cache } from "./cache";


export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    uri: 'http://it2810-44.idi.ntnu.no:4000'
  });