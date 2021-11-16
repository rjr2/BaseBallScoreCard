const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Please log in!");
    },
  },

  Mutation: {
    addUser: async (parent, { userName, email, password }) => {
      return User.create({ userName, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!profile) {
            throw new AuthenticationError('Incorrect email or password');
        }

        const correctPw = await profile.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('Incorrect email or password');
        }

        const token = signToken(user);
        return { token, user };
    }
  },
};

module.exports = resolvers;
