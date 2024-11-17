import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("file")
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    size: number;

    @Column()
    part_url: string;

    @Column()
    full_url: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    update_time: Date;
}