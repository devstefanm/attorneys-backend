import Joi from 'joi';

const passwordSchema = Joi.string()
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/)
  .required()
  .label('Password')
  .messages({
    'string.pattern.base': 'errors.passwordComplexity',
  });

const passwordLengthSchema = Joi.string()
  .min(6)
  .messages({ 'string.pattern.base': 'errors.newPasswordTooShort' });

export const loginSchema = Joi.object({
  identifier: Joi.string().required().label('Username or Email'),
  password: passwordSchema,
});

export const registrationSchema = Joi.object({
  newPassword: Joi.string()
    .required()
    .concat(passwordSchema)
    .concat(passwordLengthSchema),
});
