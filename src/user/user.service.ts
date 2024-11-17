import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async GetGithub(id: number) {
        const userInfo = await this.userRepository.findOne({
            where: {
                id: id
            }
        });

        const token = process.env.GITHUB_TOKEN;


        const data = await fetch(`https://api.github.com/users/${userInfo.github_name}`, {
            method: 'GET',
            headers: {
                Authorization: `Beaer ${token}`
            }
        })
        const dataJson = await data.json();

        return dataJson;
    }

    async GetReposInfo(username: string) {
        const data = await fetch(`https://api.github.com/users/${username}/repos`)
        const dataJson = await data.json();

        let languages = [];
        let repos = []
        let stars = 0;
        for (let i = 0; i < dataJson.length; i++) {
            const element = dataJson[i];
            if (!languages.includes(element.language)) {
                languages.push(element.language);
            }
            repos.push({
                name: element.name,
                desc: element.description,
                url: element.html_url,
                language: element.language,
            });
            stars += element.stargazers_count;
        }
        return {
            languages,
            stars,
            repos,
        }
    }

    async CreateUser(user: UserEntity) {
        const users = await this.userRepository.find();
        if (users.length > 0) {
            return {
                code: 400,
                msg: '系统仅允许注册一个用户'
            }
        }

        return await this.userRepository.save(user);
    }

    async Login(user: UserEntity) {
        const userInfo = await this.userRepository.findOne({
            where: {
                name: user.name,
                password: user.password
            }
        });
        if (userInfo) {
            const dataFromGirhub = await this.GetGithub(userInfo.id);

            if (dataFromGirhub) {
                userInfo.intro = dataFromGirhub.bio;
                userInfo.avatar = dataFromGirhub.avatar_url;
                userInfo.github_name = dataFromGirhub.login;
                userInfo.github_id = dataFromGirhub.id;
                userInfo.repos_url = dataFromGirhub.repos_url;
                await this.userRepository.update(userInfo.id, userInfo);
            }
            const reposInfo = await this.GetReposInfo(userInfo.github_name);

            delete userInfo.github_id;
            delete userInfo.password;
            delete userInfo.update_time;
            return {
                code: 200,
                msg: '登录成功',
                data: {
                    ...userInfo,
                    ...reposInfo
                }
            }
        } else {
            return {
                code: 400,
                msg: '用户名或密码错误'
            }
        }
    }

    async GetUserInfo(id: number) {
        const userInfo = await this.userRepository.findOne({
            where: {
                id: id
            }
        });
        if (!userInfo) {
            return {
                code: 400,
                msg: '用户不存在'
            }
        }

        delete userInfo.password;

        return {
            code: 200,
            msg: '获取成功',
            data: userInfo
        }
    }

    async UpdateUser(user: UserEntity) {
        const userInfo = await this.userRepository.findOne({
            where: {
                id: user.id
            }
        });
        if (!userInfo) {
            return {
                code: 400,
                msg: '用户不存在'
            }
        }
        await this.userRepository.update(user.id, user);
        const newUserInfo = await this.userRepository.findOne({
            where: {
                id: user.id
            }
        })
        delete newUserInfo.password;
        delete newUserInfo.update_time;
        return {
            code: 200,
            msg: '修改成功',
            data: newUserInfo
        }
    }

    async ChangePassword(user) {
        const userInfo = await this.userRepository.findOne({
            where: {
                id: user.id
            }
        });
        if (!userInfo) {
            return {
                code: 400,
                msg: '用户不存在'
            }
        }
        if (userInfo.password !== user.old_password) {
            return {
                code: 400,
                msg: '原先密码错误'
            }
        }
        user.password = user.new_password;
        delete user.old_password;
        delete user.new_password;
        await this.userRepository.update(user.id, user);
        return {
            code: 200,
            msg: '修改成功，请重新登录'
        }
    }
}
