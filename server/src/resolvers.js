module.exports = {
  Query: {
    beers: (_, __, { dataSources }) => dataSources.beerAPI.getAllBeers(),
    beer: (_, { id }, { dataSources }) =>
      dataSources.beerAPI.getBeerById({ id: id }),
  },
};

/* module.exports = {
  Query: {
    beers(_parent, _args, _cotext, _info) {
      return _context.db
        .collection("beers")
        .findOne()
        .then((data) => {
          return data.beers;
        });
    },
  },
};
 */
