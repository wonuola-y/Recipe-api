import { Request, Response } from "express";
import models from "../models";
import {
  successResponse,
  errorResponse,
  handleError,
} from "../utilities/responses";
import {
  RecipeInterface,
} from "../utilities/interface";

/**
 * @class RecipeController
 * @description create, log in user
 * @exports RecipeController
 */
export default class RecipeController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async createRecipe(req: Request, res: Response) {
    try {
      const {
        title, subtitle, description, materials, ingredient, steps, duration, author
      } : RecipeInterface = req.body;
      const recipe = await models.Recipe.create({
        title,
        subtitle,
        description,
        materials,
        ingredient,
        steps,
        duration,
        author
      });
      return successResponse(
        res,
        201,
        "Recipe created successfully, kindly view and print your file.",
        { recipe }
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async uploadImage(req: Request, res: Response) {
    try {
      const { recipeId } = req.params;
      const recipe = await models.Recipe.findByIdAndUpdate(
        { _id: recipeId },
        { image: req.file?.path },
        { new: true }
      );
      return successResponse(
        res,
        200,
        "Recipe image updated Successfully.",
        { recipe }
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async getRecipeById(req: Request, res: Response) {
    try {
      const { recipeId } = req.params;
      const recipe = await models.Recipe.findById({ _id: recipeId });
      return successResponse(
        res,
        200,
        "Recipe generated Successfully.",
        { recipe }
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
