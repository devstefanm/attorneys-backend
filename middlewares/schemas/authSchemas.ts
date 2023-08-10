import Joi from 'joi';

const passwordSchema = Joi.string()
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  )
  .required()
  .label('Password')
  .messages({
    'string.pattern.base': 'AUTH.WRONG_PASSWORD_FORMAT',
  });

export const loginSchema = Joi.object({
  identifier: Joi.string().required().label('Username or Email'),
  password: passwordSchema,
});

export const registrationSchema = Joi.object({
  password: passwordSchema,
});
