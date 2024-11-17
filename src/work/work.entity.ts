import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("work")
export class WorkEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: "" })
    intro: string;

    @Column({ default: "" })
    cover: string;

    @Column()
    link: string;

    @Column({ default: "1.0.0" })
    vision: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    update_time: Date;
}