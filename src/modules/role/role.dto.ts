import { IsString } from "class-validator";

export class CreateRoleDto
{
    @IsString()
    name:string
}


export class RoleResponseDto
{
    @IsString()
    id:string

    @IsString()
    name:string
}