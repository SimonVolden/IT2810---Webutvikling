const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { createStore } = require("./utils");
const BeerAPI = require("./datasources/beer");
//const resolvers = require("./resolvers");
const MongoClient = require("mongodb").MongoClient;
//import { makeExecutableSchema } from "graphql-tools";
const { makeExecutableSchema } = require("graphql-tools");
const { paginateResults } = require("./utils");
require("dotenv").config();

const resolvers = {
  Query: {
    beers(_parent, { pageSize = 20, after = 0 }, _context, _info) {
      return _context.db
        .collection("beers_test")
        .find({
          id: { $gt: after * pageSize, $lt: after * pageSize + pageSize + 1 },
        })
        .toArray()
        .then((data) => {
          if (pageSize < 1) return [];

          //if (!cursor) return data.beers.slice(0, pageSize);

          return data;
        });
    },
    beer(_parent, { id }, _context, _info) {
      return _context.db
        .collection("beers_test")
        .find({
          id: id,
        })
        .toArray()
        .then((data) => {
          //if (!cursor) return data.beers.slice(0, pageSize);

          return data[0];
        });
    },
  },

  Mutation: {
    updateLikes(_, { likes, id }, _context, _info) {
      return _context.db
        .collection("beers_test")
        .findOneAndUpdate({ id: id }, { $set: { likes: likes } })
        .then((updatedDocument) => {
          if (updatedDocument) {
            console.log(`Successfully updated document: ${updatedDocument}.`);
          } else {
            console.log("No document matches the provided query.");
          }
          return updatedDocument[0];
        })
        .catch((err) =>
          console.error(`Failed to find and update document: ${err}`)
        );
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

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
