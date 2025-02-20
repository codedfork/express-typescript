import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.model";

@Entity()
export class Role
{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({unique:true})
    name:string

    @OneToMany(()=>User, user=>user.role)
    user:User[]

}