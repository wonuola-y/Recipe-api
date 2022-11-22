import { Schema, model } from "mongoose";
import { RecipeInterface } from "../utilities/interface";

const recipeSchema = new Schema(
  {
    title: {
      type: String, unique: true, maxlength: 50, trim: true, lowercase: true
    },
    subtitle: {
      type: String, maxlength: 20, trim: true, lowercase: true
    },
    description: { type: String },
    materials: { type: String },
    ingredient: { type: String },
    steps: { type: Array },
    duration: { type: String },
    author: { type: String },
    image: { type: String, upsert: true },
    location: { type: String },
  },
  { timestamps: true }
);

export default model<RecipeInterface>("Recipe", recipeSchema);
