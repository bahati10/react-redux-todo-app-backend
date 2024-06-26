import Joi from "joi";

// Joi schema for user creation
const userCreationSchema = Joi.object({
  firstname: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.empty": "First name is required.",
      "string.pattern.base": "First name must contain only letters.",
      "any.required": "First name is required.",
    }),
  lastname: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.empty": "Last name is required.",
      "string.pattern.base": "Last name must contain only letters.",
      "any.required": "Last name is required.",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "string.empty": "Email is required.",
    "any.required": "Email is required.",
  }),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"))
    .required()
    .min(8)
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one digit and be at least 8 characters long.",
    }),
});

export const validateUserCreation = (userData: any): string[] => {
  const { error } = userCreationSchema.validate(userData, {
    abortEarly: false,
  });
  if (error) {
    return error.details.map((detail: any) => detail.message);
  }
  return [];
};
