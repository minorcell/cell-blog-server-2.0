import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "src/user/user.entity";

@Entity("bot")
export class BotEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    result: string;

    @Column({ default: 1 })

    user_id: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: "user_id" })
    user: UserEntity;
}