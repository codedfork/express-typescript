import { UserService } from "../../../src/modules/user/user.service"; // Adjust import based on actual file location
import { User } from "../../../src/modules/user/user.model";
import AppDataSource from "../../../src/modules/config/database";
import { Repository } from "typeorm";
import bcrypt from 'bcrypt';

jest.mock('bcrypt');
jest.mock('../../../src/modules/config/database'); // Mock AppDataSource to avoid hitting the actual database

describe('UserService',()=>{
    
})