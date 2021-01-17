const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();


//Import routes
const authroute = require('./routes/authroute');


//Connect to MongoDB Cloud

const uri = process.env.Database_URL;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Backend Server successfully connected to MongoDB Cloud");
});



//Middleware
app.use(express.json())


//Route Middlewares
app.use('/user', authroute);


//Port Listening
app.listen(5000, ()=> console.log('Backend Server running'));