import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    title: string;

    @Column()
    picture: string;
}