module.exports = {
  Query: {
    /* beers(_parent, { pageSize = 20, after = 0 }, _context, _info) {
      return _context.db
        .collection("beers_test")
        .find({
          id: { $gt: after * pageSize, $lt: after * pageSize + pageSize + 1 },
        })
        .toArray()
        .then((data) => {
          if (pageSize < 1) return [];
          return data;
        });
    }, */
    beer(_parent, { id }, _context, _info) {
      return _context.db
        .collection("beers_test")
        .find({
          id: id,
        })
        .toArray()
        .then((data) => {
          return data[0];
        });
    },
    beers(_parent, { pageSize = 20, after = 0, search }, _context, _info) {
      return _context.db
        .collection("beers_test")
        .find({
          name: { $regex: search, $options: "i" },
        })
        .limit(pageSize)
        .skip(after * pageSize)
        .toArray()
        .then((data) => {
          if (pageSize < 1) return [];

          return data;
        });
    },
  },

  Mutation: {
    updateLikes: async (_, { id, liked }, _context, _info) => {
      let likes;
      await _context.db
        .collection("beers_test")
        .find({
          id: id,
        })
        .toArray()
        .then((data) => {
          console.log("Likes: " + data[0].likes);
          likes = data[0].likes;
        });

      console.log(typeof likes);
      if (typeof likes !== "number") {
        console.log("Not a number!");
        likes = 0;
      }

      console.log(id, likes, liked);
      if (liked) {
        return _context.db
          .collection("beers_test")
          .findOneAndUpdate({ id: id }, { $set: { likes: likes + 1 } })
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
      } else {
        return _context.db
          .collection("beers_test")
          .findOneAndUpdate({ id: id }, { $set: { likes: likes - 1 } })
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
      }
    },
  },
};
