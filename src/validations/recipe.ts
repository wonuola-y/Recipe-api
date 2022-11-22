import Joi from "joi";
import { RecipeInterface } from "../utilities/interface";

const validateRecipe = (recipe: RecipeInterface) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    subtitle: Joi.string().min(5).max(20).required(),
    description: Joi.string().min(10).max(3000).required(),
    materials: Joi.string().email().required(),
    ingredient: Joi.string().required().min(6).max(16),
    steps: Joi.array().required(),
    duration: Joi.string().required(),
    author: Joi.string().required(),
    image: Joi.string().required(),
  });
  return schema.validate(recipe);
};

export default validateRecipe;
