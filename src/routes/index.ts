import { Router } from "express";
import recipe from "./recipe";
import print from "./print";

const router = Router();

router.use("/recipe", recipe);
router.use("/print", print);

export default router;
