import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { CreatePostDto } from "./post.dto";
import { validateOrReject } from "class-validator";
import logger from "../../utils/logger";
import { apiResponseBadRequest, apiResponseOk } from "../../utils/apiHandler";
import { PostService } from "./post.service";

export class PostController {

    private postService: PostService;
    constructor() {
        this.postService = new PostService();
    }


    public async create(req: Request, res: Response) {
        try {

            const postPayload = plainToInstance(CreatePostDto, req.body);
            await validateOrReject(postPayload);

            const post = await this.postService.create(postPayload);

            apiResponseOk(post, res);

        } catch (error) {
            logger.error(error);
            apiResponseBadRequest(error, res);
        }

    }

    public async get(req:Request, res:Response)
    {
        try {
            const posts = await this.postService.getAllPosts();
            apiResponseOk(posts,res);
        } catch(error)
        {
            logger.error(error);
            apiResponseBadRequest(error,res);
        }
    }
}