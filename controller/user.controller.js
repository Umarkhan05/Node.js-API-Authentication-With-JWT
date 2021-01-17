const express = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Importing validation controller
const validatationcontroller = require('./validation.controller');


///User Signup/Register

exports.user_signup = async (req,res) => {

//Validating User while signing up
const {error} = validatationcontroller.signupvalidateSchema.validate(req.body);
if(error)
    return res.status(400).send(error.details[0].message);

    //Checking if user is already in the database
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist)
        return res.status(400).send('Email already exist');

    //Hashing the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Creating new User
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});

    }catch(err){
        res.status(400).send(err)
    }

};


    ///User Login

exports.user_login = async (req,res) => {

    //Validating User while Logging in
    const {error} = validatationcontroller.loginvalidateSchema.validate(req.body);
        if(error)
            return res.status(400).send(error.details[0].message);


        //Checking if email in the database
      const user = await User.findOne({email: req.body.email})
      if(!user)
          return res.status(400).send('Email is not exist');
        //Checking if password is matched
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass)
            return res.status(400).send('Password is incorrect');
        //Creating and Assigning a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send(token)
        

}

exports.secretfiles = (req,res) => {
    res.json({"Umar": "4 logins left"})
}



