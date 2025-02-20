import { Router } from "express";
import userRoutes from "../modules/user/user.route";
import postRoutes from "../modules/post/post.route";
const router = Router();

router.use('/user',userRoutes);
router.use('/post',postRoutes);


export {router};