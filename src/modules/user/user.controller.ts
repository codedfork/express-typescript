import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { UserDto } from "./user.dto";
import { validate, validateOrReject } from "class-validator";
import { apiResponseBadRequest, apiResponseNotFound, apiResponseOk } from "../../utils/apiHandler";
import { IAuthUser } from "./user.interface";
import logger from "../../utils/logger";
import { UserService } from "./user.service";
import { Authorization } from "../../middleware/authorization";

export class UserController {

    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    async create(req: Request, res: Response) {
        try {
            const reqBody: UserDto = plainToInstance(UserDto, req.body);
            await validateOrReject(reqBody, {
                whitelist: true,
                forbidNonWhitelisted: true,
            });
            const createdUser = await this.userService.create(reqBody);
            apiResponseOk(createdUser, res);
        }
        catch (error) {
            logger.error(error);
            // If the error message is 'Email already exists', return a conflict response
            if (error.message === 'Email already exists') {
                apiResponseBadRequest(error.message, res);
            }
        }
    }


    //Function to create a user with authentication
    async createAndAuth(req: Request, res: Response) {
        try {
            const reqBody: UserDto = plainToInstance(UserDto, req.body);
            await validateOrReject(reqBody, {
                whitelist: true,
                forbidNonWhitelisted: true,
            });
            const createdUser = await this.userService.create(reqBody);
            const token = Authorization.generateJwt(createdUser.id, createdUser.email);
            apiResponseOk({ "data": { createdUser, token: token } }, res);
        }
        catch (error) {
            logger.error(error);
            // If the error message is 'Email already exists', return a conflict response
            if (error.message === 'Email already exists') {
                apiResponseBadRequest(error.message, res);
            }
        }
    }

    //Function to get all users
    async get(req:Request,res: Response) {
        const users = await this.userService.getAllUsers();
        if (users.length) {
            apiResponseOk(users, res);
        } else {
            apiResponseNotFound({
                message: "No Data found"
            }, res);
        }
    }

    //Function to get all users
    async login(req: Request, res: Response) {
        const authPayload: IAuthUser = { email: req.body.email, password: req.body.password }
        const response = await this.userService.auth(authPayload);
        if (response) {
            apiResponseOk(response, res);
        } else {
            apiResponseNotFound({
                message: "Wrong credentials.."
            }, res);
        }
    }

}