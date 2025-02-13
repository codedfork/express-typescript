import { IsEnum, IsOptional, IsString } from "class-validator";

export class UserDto {
    @IsString()
    // @IsOptional()
    role : string;
    
    @IsString()
    // @IsOptional()
    jobTitle : string

    @IsString()
    // @IsOptional()
    sortBy : string

    @IsEnum(["ASC","DESC"])
    // @IsOptional()
    order: "ASC" | "DESC"
}