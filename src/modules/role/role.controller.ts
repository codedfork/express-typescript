import { Request, Response } from "express";
import { RoleService } from "./role.service";
import { plainToInstance } from "class-transformer";
import { CreateRoleDto } from "./role.dto";
import { validateOrReject } from "class-validator";
import { apiResponseBadRequest, apiResponseOk } from "../../utils/apiHandler";
import logger from "../../utils/logger";

export class RoleController
{

    private roleService:RoleService;
    constructor()
    {
         this.roleService= new RoleService();   
    }
    //Function to create a role
    public async create(req:Request, res:Response)
    {   
        try {
                const rolePayload = plainToInstance(CreateRoleDto, req.body);
                await validateOrReject(rolePayload);

                const savedRole = await this.roleService.createRole(rolePayload);
                
                apiResponseOk({savedRole,message:"Role created successfully."}, res);

        } catch (error) {
            logger.error(error);
            apiResponseBadRequest(error,res);
        }
    }

}