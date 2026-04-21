import { Controller, Get, Delete, Put, Param, Body, ParseIntPipe} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserById(id);
    }

    @Put('/:id')
    updateUserById(@Param('id', ParseIntPipe) id : number, @Body() body : {password : string}) {
        return this.userService.updateUserById(id, body.password);
    }

    @Delete('/:id')
    deleteUserById(@Param('id', ParseIntPipe) id : number) {
        return this.userService.deleteUserById(id);
    }
}