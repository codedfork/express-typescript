import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { UserDto } from "./user.dto";
import { validate, validateOrReject } from "class-validator";
import { apiResponseBad, apiResponseOk } from "../../utils/apiHandler";
import logger from "../../utils/logger";
import { UserService } from "./user.service";

export class UserController {

    async create(req:Request, res:Response)
    {
        try
        {
            const reqBody:UserDto = plainToInstance(UserDto, req.body);
            await validateOrReject(reqBody, {
                whitelist: true,
                forbidNonWhitelisted: true,
              });
              const userService = new UserService();
             userService.create(reqBody);
          
            apiResponseOk({"data":reqBody},res);
        }
        catch(error)
        {
            logger.error(error);
            apiResponseBad({"error":error},res);
        }
    }
}