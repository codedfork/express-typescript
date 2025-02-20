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

export class AssignRoleDto
{
    @IsString()
    userId:string

    @IsString()
    roleId:string
}

export class AssignedRoleResponseDto
{
    @IsString()
    userId:string

    @IsString()
    userName:string

    @IsString()
    roleId:string

    @IsString()
    roleName:string
}

export class GetSingleUserDto
{
    @IsString()
    @IsOptional()
    email:string

    @IsString()
    @IsOptional()
    id:string
}