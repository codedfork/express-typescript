import { Router } from "express";
import { UserController } from "./user.controller";

const userRoutes = Router();
const userController= new UserController(); 

userRoutes.post('/create', userController.create);


export default userRoutes;