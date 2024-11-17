import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async CreateUser(@Body() user: UserEntity) {
        return await this.userService.CreateUser(user);
    }

    @Post('login')
    async Login(@Body() user: UserEntity) {
        return await this.userService.Login(user);
    }

    @Get(':id')
    async GetUser(@Param('id') id: number) {
        return await this.userService.GetUserInfo(id);
    }

    @Put()
    async UpdateUser(@Body() user: UserEntity) {
        return await this.userService.UpdateUser(user);
    }

    @Put('password')
    async UpdatePassword(@Body() user: UserEntity) {
        return await this.userService.ChangePassword(user);
    }
}
