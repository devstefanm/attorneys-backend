import Joi from 'joi';

export const casesSchema = Joi.object({
  // first_name: Joi.string().when('is_legal', {
  //   is: false,
  //   then: Joi.string().required(),
  //   otherwise: Joi.forbidden(),
  // }),
  // last_name: Joi.string().when('is_legal', {
  //   is: false,
  //   then: Joi.string().required(),
  //   otherwise: Joi.forbidden(),
  // }),
  // name: Joi.string().when('is_legal', {
  //   is: true,
  //   then: Joi.string().required(),
  //   otherwise: Joi.forbidden(),
  // }),
  cession: Joi.number().required(),
  principal: Joi.number().required(),
  interest: Joi.number().required(),
  client_id: Joi.number().required(),
  debtor_id: Joi.number().required(),
  state: Joi.string().required(),
  contract_number: Joi.string().required(),
  case_number: Joi.string().required(),
});
