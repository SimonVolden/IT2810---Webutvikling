const crypto = require("crypto");

module.exports = {
  Query: {
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
    beers(
      _parent,
      { pageSize = 20, after = 0, search, field = "id", order = 1 },
      _context,
      _info
    ) {
      const sortBydict = {};

      if (field && order) {
        sortBydict[field] = order;
      }

      return _context.db
        .collection("beers_test")
        .find({
          name: { $regex: search, $options: "i" },
        })
        .sort(sortBydict)
        .limit(pageSize)
        .skip(after * pageSize)
        .toArray()
        .then((data) => {
          if (pageSize < 1) return [];

          return data;
        });
    },
    users: async (_parent, { email }, _context, _info) => {
      return _context.db
        .collection("users")
        .find({ email: email })
        .toArray()
        .then((data) => {
          return data[0];
        });
    },
    validToken: async (_parent, { token }, _context, _info) => {
      const user = await _context.db
        .collection("users")
        .find({ token: token })
        .toArray()
        .then((data) => {
          return data[0];
        });
      if (user) {
        return true;
      } else {
        return false;
      }
    },
    getLikedByUser: async (_parent, { token }, _context, _info) => {
      const user = await _context.db
        .collection("users")
        .find({ token: token })
        .toArray()
        .then((data) => {
          return data[0];
        });

      const beers = [];
      if (user) {
        const liked = await _context.db
          .collection("likes")
          .find({
            user: { email: user.email, token: user.token },
          })
          .toArray()
          .then((data) => {
            return data;
          });

        liked.map((beer) => beers.push(beer.id));
      }
      return beers;
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
          likes = data[0].likes;
        });

      if (typeof likes !== "number") {
        likes = 0;
      }

      if (liked) {
        return _context.db
          .collection("beers_test")
          .findOneAndUpdate({ id: id }, { $set: { likes: likes + 1 } })
          .then((updatedDocument) => {
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
            return updatedDocument[0];
          })
          .catch((err) =>
            console.error(`Failed to find and update document: ${err}`)
          );
      }
    },
    login: async (_, { email, password }, _context, _info) => {
      const token = crypto
        .createHash("sha512")
        .update(email + password)
        .digest("hex");
      const user = await _context.db
        .collection("users")
        .findOne({ email: email, token: token });
      if (user) {
        return user;
      } else {
        console.log(
          "Found no users with that email, or the password is incorrect."
        );
      }
      return user;
    },
    signup: async (_, { email, password }, _context, _info) => {
      //Checks if user exsists
      const user = await _context.db
        .collection("users")
        .findOne({ email: email });

      if (!user) {
        console.log("Found no users with that email, creating new");
        const token = crypto
          .createHash("sha512")
          .update(email + password)
          .digest("hex");
        _context.db
          .collection("users")
          .insertOne({ email: email, token: token });
        return true;
      } else {
        console.log("There already exsists a user with that email");
        return false;
      }
    },
    like: async (_, { token, beerID }, _context, _info) => {
      const user = await _context.db
        .collection("users")
        .find({ token: token })
        .toArray()
        .then((data) => {
          return data[0];
        });

      if (user) {
        _context.db
          .collection("likes")
          .findOne({
            user: { email: user.email, token: user.token },
            id: beerID,
          })
          .then((data) => {});

        const like = await _context.db
          .collection("likes")
          .findOne({
            user: { email: user.email, token: user.token },
            id: beerID,
          })
          .then((data) => {
            return data;
          });

        if (like == null) {
          _context.db.collection("likes").insertOne({
            user: { email: user.email, token: user.token },
            id: beerID,
          });
          return true;
        } else {
          _context.db.collection("likes").deleteOne({
            user: { email: user.email, token: user.token },
            id: beerID,
          });
          return false;
        }
      }
      return false;
    },
  },
};
