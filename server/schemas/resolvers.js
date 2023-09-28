const { AuthenticationError } = require('apollo-server-express');
const { User, Translation } = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt'); 

const resolvers = {
  Query: {
    // query to get user's translations by username
    getUserTranslations: async (_, { username }) => {
      try {
        // find user by username
        const user = await User.findOne({ username });

        if (!user) {
          throw new Error('User not found');
        }

        // retrieve translations associated with user
        const translations = await Translation.find({ user: user._id });

        return translations;
      } catch (error) {
        throw new Error('Error fetching user translations: ' + error.message);
      }
    },
  },

  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        // check if user with same username or email already exists
        const existingUser = await User.findOne({
          $or: [{ username }, { email }],
        });

        if (existingUser) {
          throw new Error('User with this username or email already exists');
        }

        // has password before saving it to database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // generate a JWT token and return it along with user object
        const token = 'placeholder-jwt-token'; // replace with actual JWT token generation

        return { token, user: newUser };
      } catch (error) {
        throw new Error('Error creating user: ' + error.message);
      }
    },

    // mutation to create a translation
    createTranslation: async (_, { text, language }, context) => {
      try {
        // check if user is authenticated
        if (!context.user) {
          throw new Error('Authentication required to create a translation');
        }

        // get authenticated user's ID from context
        const userId = context.user._id;

        // create a new translation and associate it with the user
        const translation = new Translation({
          text,
          language,
          user: userId,
        });

        await translation.save();

        return translation;
      } catch (error) {
        throw new Error('Error creating translation: ' + error.message);
      }
    },

    // mutation to log user in
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
