const Joi = require('@hapi/joi');



exports.signupvalidateSchema = Joi.object( {
    firstname: Joi.string()
            .min(3)
            .required(),
     lastname: Joi.string()
            .min(3)
            .required(),
    email: Joi.string()
            .email()
            .required(),
    password: Joi.string()
            .min(6)
            .required()

});


exports.loginvalidateSchema = Joi.object( {
    
        email: Joi.string()
                .email()
                .required(),
        password: Joi.string()
                .min(6)
                .required()
    
    });