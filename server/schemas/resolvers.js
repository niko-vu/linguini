const { AuthenticationError } = require('apollo-server-express');
const { User, Phrase } = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    // query to get user's translated phrases by username
    getUser: async (_, { _id }) => {
      try {
        // Use the User model to find a user by ID
        const user = await User.findById(_id);
        return user; // Return the found user
      } catch (error) {
        throw new Error(`Error fetching user: ${error}`);
      }
    },
    getPhrases: async (_, { language }) => {
      try {
        // Use the Phrase model to find phrases by language
        const phrases = await Phrase.find({ language });
        return phrases; // Return the found phrases
      } catch (error) {
        throw new Error(`Error fetching phrases: ${error}`);
      }
    },
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      try {
        // check if user with same username or email already exists
        const existingUser = await User.findOne({
          $or: [{ username }, { email }],
        });

        if (existingUser) {
          throw new Error('User with this username or email already exists');
        }

        // hash password before saving it to database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // generate a JWT token and return it along with user object
        const token = signToken(newUser); // replace with actual JWT token generation

        return { token, user: newUser };
      } catch (error) {
        throw new Error('Error creating user: ' + error.message);
      }
    },


    login: async (_, { email, password }) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });
    
        if (!user) {
          throw new AuthenticationError('User not found');
        }
    
        // Compare the provided password with the hashed password in the database
        const correctPassword = await bcrypt.compare(password, user.password);
    
        if (!correctPassword) {
          throw new AuthenticationError('Incorrect password');
        }
    
        // If the password is correct, generate and return the JWT token
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new AuthenticationError(`Error logging in: ${error.message}`);
      }
    },

    // mutation to create a phrase
    createPhrase: async (_, { text, translation, language }) => {
      try {
        // Create a new phrase using the Phrase model
        const phrase = new Phrase({ text, translation, language });
        
        await phrase.save(); // Save the phrase to the database
        return phrase; // Return the created phrase
      } catch (error) {
        throw new Error(`Error creating phrase: ${error}`);
      }
    },
  },
  };


module.exports = resolvers;
