module.exports = {
  Query: {
    beers: (_, __, { dataSources }) => dataSources.beerAPI.getAllBeers(),
    beer: (_, { id }, { dataSources }) =>
      dataSources.beerAPI.getBeerById({ id: id }),
  },
};
