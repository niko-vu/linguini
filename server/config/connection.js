const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/linguini', {
    useNewUrlParser:true, 
    useUnifiedTopology:true
});

module.exports = mongoose.connection;
