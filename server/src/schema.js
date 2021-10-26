const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema will go here
  type Beer {
    id: ID!
    name: String!
    tagline: String
    first_brewed: String
    description: String
    image_url: String
    abv: String
    ibu: String
    target_fg: String
    target_og: String
    ebc: String
    srm: String
    ph: String
    attenuation_level: String
    volume: Volume
    boil_volume: Volume
    method: Method
    ingredients: Ingredients
    food_pairing: [String]
    brewers_tips: String
    contributed_by: String
    likes: Int
  }

  type Volume {
    value: Float
    unit: String
  }

  type Method {
    mash_temp: [Mash_Temp]
    fermentation: Temperature
    twist: String
  }

  type Mash_Temp {
    temp: Temperature
    duration: Int
  }

  type Temperature {
    value: Int
    unit: String
  }

  type Ingredients {
    malt: [Malt]
    hops: [Hops]
    yeast: String
  }

  type Malt {
    name: String
    amount: Volume
  }

  type Hops {
    name: String
    amount: Volume
    add: String
    attribute: String
  }

  type User {
    email: String
    token: String
  }

  type Query {
    beers(pageSize: Int, after: Int, search: String): [Beer]!
    beer(id: Int!): Beer!
    getBeersByName(pageSize: Int, after: Int, search: String): [Beer]
    users(email: String): User
    validToken(token: String!): Boolean
  }

  type Mutation {
    updateLikes(id: Int!, liked: Boolean): Beer
    login(email: String, password: String): User
    signup(email: String, password: String): Boolean
  }
`;

module.exports = typeDefs;
