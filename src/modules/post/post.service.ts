import { Repository } from "typeorm";
import { CreatePostDto, PostResponseDto } from "./post.dto";
import { Post } from "./post.model";
import AppDataSource from "../config/database";
import { User } from "../user/user.model";

export class PostService {
    private postRepository: Repository<Post>;
    private userRepository: Repository<User>;
    constructor() {
        this.postRepository = AppDataSource.getRepository(Post);
        this.userRepository = AppDataSource.getRepository(User);
    }
    //Function to create a new Post
    public async create(createPostDto: CreatePostDto): Promise<PostResponseDto> {
        try {

            const { content, userId, title } = createPostDto;

            const user = await this.userRepository.findOne({
                where: {
                    id: userId
                }
            });

            if (!user) {
                throw new Error("User not found..");
            }
            const post = new Post()
            post.content = content;
            post.title = title;
            post.user = user;
            const savedPost = await this.postRepository.save(post);

            return {
                id: savedPost.id,
                title: savedPost.title,
                content: savedPost.content,
                username: savedPost.user.name,
                userId: savedPost.user.id
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    //Function to get all posts and related users

    public async getAllPosts(): Promise<Post[]> {
        const posts = await this.postRepository.find({
            relations: ['user']
        })
        return posts;
    }

}