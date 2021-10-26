const crypto = require("crypto");

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
    users: async (_parent, { email }, _context, _info) => {
      return _context.db
        .collection("users")
        .find({ email: email })
        .toArray()
        .then((data) => {
          console.log(data[0].email);
          return data[0];
        });
    },
    validToken: async (_parent, { token }, _context, _info) => {
      const user = await _context.db
        .collection("users")
        .find({ token: token })
        .toArray()
        .then((data) => {
          console.log(data[0]);
          return data[0];
        });
      if (user) {
        return true;
      } else {
        console.log("Invalid token");
        return false;
      }
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
  },
};
