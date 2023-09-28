const db = require('./connection');
const { User, Product, Category } = require('../models');
const mongoose = require('mongoose');
const User = require('./models/User');
const Translation = require('./models/translate');

// connect to MongoDB database
mongoose.connect('mongodb://localhost/linguini', { useNewUrlParser: true, useUnifiedTopology: true });

const usersData = [
  {
    username: 'user1',
    email: 'user1@example.com',
    password: 'password1',
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    password: 'password2',
  },
];

const translationsData = [
  {
    sourceLanguage: 'English',
    targetLanguage: 'Spanish',
    text: 'Hello',
    translation: 'Hola',
    userId: 'user1', // reference to user who create translation
  },
  {
    sourceLanguage: 'English',
    targetLanguage: 'French',
    text: 'Goodbye',
    translation: 'Au revoir',
    userId: 'user2',
  },
];

// function to seed database
async function seedDatabase() {
  try{
    // insert sample data into the collections
    const users = await user>insertMany(usersData);
    const translations = await Translation.insertMany(translationsData);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    // disconnect from the database when done
    mongoose.disconnect();
  }
}

seedDatabase();
