import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("info")
export class InfoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    update_time: Date;
}