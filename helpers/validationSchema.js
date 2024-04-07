const Joi = require('joi');

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const customEmailValidation = (value, helpers) => {
  if (!emailRegex.test(value)) {
    return helpers.message({
      custom: 'Email must be a valid address.',
    });
  }

  const emailParts = value.split('@');
  const domain = emailParts[1];

  // Check if the domain is gmail.com and if the local part has at least 3 letters
  if (domain === 'gmail.com' && (/^[a-zA-Z]{1,}.*$/).test(emailParts[0])) {
    return value;
  }

  return helpers.message({
    custom: 'Email must be a valid address with at least 1 letter before @gmail.com',
  });
};

const authSchema = Joi.object({
    email: Joi.string()
      .custom(customEmailValidation, 'customValidation')
      .lowercase()
      .max(30)
      .messages({
        'string.customValidation': 'Email is not valid',
        'string.max': 'Email must be at most 30 characters long',
      }),
    password: Joi.string()
      .min(6) // Adjust the minimum length as needed
      .max(30)
      .required()
    //   .regex(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d?)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    //   )
      .messages({
        "string.min": "Password length must be at least 6 characters",
        // "string.pattern.base":
        //   "Password must contain at least one uppercase letter, and one special character",
      }),
      name: Joi.string()
      .max(30)
      .optional()
  });
  module.exports={authSchema}