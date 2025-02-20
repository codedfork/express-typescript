export interface IUser
{
    role:string;
    jobTitle:string;
    sortBy : string;
    order : "ASC" | "DESC";

}

export interface IAuthUser 
{
    email: string;
    password: string;
}