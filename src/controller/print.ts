import { Request, Response } from "express";
import puppeteer from "puppeteer";
import config from "../config";
import models from "../models";
import {
  successResponse,
  errorResponse,
  handleError,
} from "../utilities/responses";

/**
 * @class ReciprintController
 * @description create, log in user
 * @exports ReciprintController
 */
export default class ReciprintController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async printRecipe(req: Request, res: Response) {
    try {
      const { recipeId } = req.params;
      const recipe = await models.Recipe.find({ where: { id: recipeId } }).select("-timestamp");
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      console.log(recipe);
      await page.setContent(recipe.toString());
      await page.pdf({
        path: "src/recipe.pdf",
        format: "A4",
        printBackground: true,
      });
      console.log(`Recipe card generated from ${config.APP_NAME}`);
      await browser.close();
      return successResponse(res, 200, "A4 paper generated right under your app.ts",);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
