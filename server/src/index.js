const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { createStore } = require("./utils");
const BeerAPI = require("./datasources/beer");
const resolvers = require("./resolvers");
const MongoClient = require("mongodb").MongoClient;
//import { makeExecutableSchema } from "graphql-tools";
const { makeExecutableSchema } = require("graphql-tools");
const { paginateResults } = require("./utils");
require("dotenv").config();


let db;
const uri =
  "mongodb://it2810:it2810@it2810-44.idi.ntnu.no:27017/?authSource=it2810";

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async () => {
    if (!db) {
      try {
        const dbClient = new MongoClient(
          "mongodb://it2810:it2810@it2810-44.idi.ntnu.no:27017/?authSource=it2810",
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        );

        if (!dbClient.isConnected) await dbClient.connect();
        db = dbClient.db("it2810"); // database name
      } catch (e) {
        console.log("--->error while connecting with graphql context (db)", e);
      }
    }
    return { db };
  },
});

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `);
});

/* 
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    beerAPI: new BeerAPI(),
  }),
}); */
