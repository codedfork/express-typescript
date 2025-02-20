import { Repository } from "typeorm";
import { Role } from "./role.model";
import AppDataSource from "../config/database";
import { CreateRoleDto, RoleResponseDto } from "./role.dto";
export class RoleService
{
    private roleRepository:Repository<Role>;

    constructor()
    {
        this.roleRepository= AppDataSource.getRepository(Role);
    }

    public async createRole(createRoleDto:CreateRoleDto):Promise<RoleResponseDto>
    {        
        const newRole = this.roleRepository.create(createRoleDto);
        const savedRole = await this.roleRepository.save(newRole);

        return {
            id:savedRole.id,
            name:savedRole.name
        }
    }
}