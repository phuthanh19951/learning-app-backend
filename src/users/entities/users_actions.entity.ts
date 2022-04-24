import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique } from "typeorm"

enum ActionType {
    LIKE = 'like',
    PASS = 'pass'
};

@Entity({name: 'users_actions' })
@Unique(['userId', 'stuffId'])
export class UserAction extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "enum",
        enum: ActionType
    })
    action: string

    @Column()
    userId: string;

    @Column()
    stuffId: string;
}