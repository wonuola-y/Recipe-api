import { Router } from "express";
import ReciprintController from "../controller/print";

const router = Router();
const { printRecipe } = ReciprintController;

router.get("/:recipeId", printRecipe);

export default router;
