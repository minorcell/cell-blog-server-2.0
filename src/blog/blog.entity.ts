import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("blog")
export class BlogEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ length: 20, default: "前端" })
    type: string;

    @Column({ type: "text" })
    intro: string;

    @Column({ default: "" })
    cover: string;

    @Column({ default: "editing" })
    status: string;

    @Column({ default: 1 })
    looks: number;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    update_time: Date;
}