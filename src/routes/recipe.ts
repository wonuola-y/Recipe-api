import { Router } from "express";
import RecipeController from "../controller/recipe";
import validator from "../middleware/validator";
import parser from "../middleware/upload";
import validateRecipe from "../validations/recipe";

const router = Router();
const { createRecipe, uploadImage, getRecipeById, } = RecipeController;

router.post("/", validator(validateRecipe), createRecipe);

router.get("/:recipeId", getRecipeById);

router.patch("/:recipeId", parser.single("image"), uploadImage);

export default router;
