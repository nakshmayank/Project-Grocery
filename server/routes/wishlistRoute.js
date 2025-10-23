import express from "express";
import authUser from "../middlewares/authUser.js";
import { updateWishlist } from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/update", authUser, updateWishlist);

export default wishlistRouter;