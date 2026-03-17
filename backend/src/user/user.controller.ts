import { Controller, Get, Post, Delete, Put, Param , Body} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get('/:id')
    getUser(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Post()
    createUsers(@Body() body: {login : string, password : string}) {
        return this.userService.createUsers(body.login, body.password);
    }

    @Put('/:id')
    updateUserById(@Param('id') id : string, @Body() body : {password : string}) {
        return this.userService.updateUserById(id, body.password);
    }

    @Delete('/:id')
    deleteUserById(@Param('id') id :string) {
        return this.userService.deleteUserById(id);
    }
}
