import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.model";

@Entity()
export class Post
{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    title:string

    @Column()
    content:string

    @ManyToOne(()=>User, user => user.posts)
    user:User
}