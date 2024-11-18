import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("bot")
export class BotEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: "" })
    api_key: string;

    @Column({ default: "" })
    bot_id: string;

    @Column({ default: "BOT CELL" })
    intro: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    update_time: Date;
}