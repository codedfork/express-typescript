import { UserDto } from "./user.dto";
import AppDataSource from "../config/database";
import { User } from "./user.model";
import { Repository } from "typeorm";
import { NextFunction, Request } from "express";
import { IAuthUser } from "./user.interface";
import { Authorization } from "../../middleware/authorization";
import bcrypt from 'bcrypt';
import { plainToClass } from "class-transformer";
export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    /**
     * Function to create a user
     * @param userQueryParams
     * @returns 
     */
    public async create(userQueryParams: UserDto): Promise<User> {
        try {
            const saltRounds = 10;
            userQueryParams.password = await bcrypt.hash(userQueryParams.password, saltRounds);
            const newUser = this.userRepository.create(userQueryParams);
            const savedUser= await this.userRepository.save(newUser);
            return plainToClass(User, savedUser);
        } catch (error) {
            if (error.code === '23505') { // Unique violation error code (Postgres)
                throw new Error('Email already exists');
            }
            throw error;
        }
    }

    /**
     * Function to get all users
     * @returns 
     */
    public async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.userRepository.find({
                select:['id','name','email','address'],
                relations:['posts']
            });
            return users;
        } catch (error) {
            throw new Error('Error fetching users');
        }
    }

    /**
     * Function to update a user
     * @param userQueryParams 
     * @returns 
     */
    public async updateUser(userQueryParams: UserDto): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: { email: userQueryParams.email }
            });

            if (!user) {
                throw new Error('User not found');
            }

            // Update the user's properties (excluding password if not provided)
            Object.assign(user, userQueryParams);

            return await this.userRepository.save(user);
        } catch (error) {
            throw new Error('Error updating user');
        }
    }

    /**
     * Function to update a user's password
     * @param userId
     * @param newPassword 
     * @returns 
     */
    public async updatePassword(userId: string, newPassword: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId }
            });

            if (!user) {
                throw new Error('User not found');
            }

            // Hash the new password
            const saltRounds = 10;
            user.password = await bcrypt.hash(newPassword, saltRounds);

            return await this.userRepository.save(user);
        } catch (error) {
            throw new Error('Error updating password');
        }
    }

    // Function to authenticate a user
    public async auth(authPayload: IAuthUser): Promise<string | boolean> {
        const { email, password } = authPayload;
        const user = await this.userRepository.findOne({
            where: {
                email: email,
            }
        });

        if (user) {
            const passwordStatus = await bcrypt.compare(password, user.password);
            if (passwordStatus) {
                const token = Authorization.generateJwt(user.id, user.email);
                return token;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
