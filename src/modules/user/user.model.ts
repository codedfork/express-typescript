import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, Unique, IsNull, OneToMany} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Post } from '../post/post.model';
@Entity()
export class User
{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column({unique:true})
    email:string

    @Column()
    address:string

    @Column({nullable:true})
    @Exclude()
    password:string

    @OneToMany(()=>Post, post=>post.user)
    posts:Post[]
}