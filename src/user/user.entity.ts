import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20, default: () => Math.random().toString() })
    name: string;

    @Column({ length: 20, default: '123456' })
    password: string;

    @Column({ length: 100, default: '大前端技术爱好者' })
    intro: string;

    @Column({ default: '' })
    avatar: string;

    @Column({ default: 0 })
    role: number; // 0: 普通用户 1: 超管管理员

    @Column()
    github_name: string;

    @Column()
    github_id: number;

    @Column({ default: "" })
    repos_url: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    update_time: Date
}