import Joi from "joi";

export const todoSchema = Joi.object({
  content: Joi.string().required().messages({
    "string.pattern.base": "Content Text must contain only letters",
    "string.empty": "Todo content is required.",
    "any.required": "Todo content is required.",
  }),
});

export const validateUserCreation = (todoData: any): string[] => {
  const { error } = todoSchema.validate(todoData, { abortEarly: false });
  if (error) {
    return error.details.map((detail: any) => detail.message);
  }
  return [];
};
