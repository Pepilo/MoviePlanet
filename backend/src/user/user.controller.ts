import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get('hello')
    getHello() : string {
        return this.userService.getHello();
    }
}
