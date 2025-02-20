
import { Router } from "express"
import { PostController } from "./post.controller";

const postRoutes = Router();

const postController = new PostController();


postRoutes.post('/create',postController.create.bind(postController));
postRoutes.get('/get',postController.get.bind(postController));

export default postRoutes;