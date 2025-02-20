import { Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

const userRoutes = Router();
const userController= new UserController(); 

userRoutes.post('/create', userController.create.bind(userController));
userRoutes.post('/create-auth', userController.createAndAuth.bind(userController));
userRoutes.post('/login', userController.login.bind(userController));
userRoutes.get('/get', userController.get.bind(userController));
userRoutes.post('/assign-role', userController.assignRole.bind(userController));
userRoutes.get('/get-user', userController.getOne.bind(userController));


export default userRoutes;