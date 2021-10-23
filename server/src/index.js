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
        .collection("beers")
        .findOne()
        .then((data) => {
          if (pageSize < 1) return [];

          //if (!cursor) return data.beers.slice(0, pageSize);

          return data.beers.slice(after, after + pageSize);
        });
<<<<<<< HEAD
=======
    }, */
    beers(_parent, _args, _context, _info) {
      console.log(_context.db.collection("beers").find({}));
      return _context.db.collection("beers").find({}).then((data) => {
        return data.beers;
      });
>>>>>>> 21890797638125c5fadbe84db7d376b709e7acb9
    },
    beer(_parent, { id }, _context, _info) {
      return _context.db
        .collection("beers")
        .findOne()
        .then((data) => {
          console.log(id);
          if (241 > id > 0) {
            return data.beers[id - 1];
          }
          //console.log(data.beers.slice(0, 3));
          else {
            console.error("ID must be between 1 and 240");
          }
        });
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
