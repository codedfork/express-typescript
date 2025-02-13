import { UserDto } from "./user.dto";

export class UserService{
    async create(userQueryParams : UserDto):Promise<UserDto>
    {
        const {jobTitle, order, sortBy, role} = userQueryParams;
        


    }
}