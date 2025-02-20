import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string; // Title of the post

    @IsString()
    @IsNotEmpty()
    content: string; // Content of the post

    @IsString()
    @IsNotEmpty()
    userId: string; // User ID to associate the post with a user
}


export class PostResponseDto{
    @IsString()
    id: string; // Post ID

    @IsString()
    title: string; // Title of the post

    @IsString()
    content: string; // Content of the post

    @IsString()
    userId: string; // User ID of the creator

    @IsString()
    username: string; // Username of the creator (from the User entity)
}