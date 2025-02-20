import { Router } from "express";
import { RoleController } from "./role.controller";

const roleRoutes = Router();

const roleController = new RoleController();

roleRoutes.post('/create', roleController.create.bind(roleController));


export default roleRoutes