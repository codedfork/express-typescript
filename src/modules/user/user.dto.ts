import { IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UserDto {
    @IsString()
    @IsOptional()
    name : string;
    
    @IsString()
    @IsOptional()
    email : string

    @IsString()
    @IsOptional()
    address : string

    @IsStrongPassword()
    @IsOptional()
    password: string

    @IsStrongPassword()
    @IsOptional()
    data: string
}