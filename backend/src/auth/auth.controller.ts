import { Controller, Body, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBody } from './auth.service';
import { JwtAuthGuard } from './auth-guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {

    constructor (private readonly authService : AuthService, private readonly userService : UserService) {}

    @Post('login')
    loginUser(@Body() authBody: AuthBody) {
        return this.authService.loginUser({authBody});
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async authenticateUser(@Request() request) {
        return await this.userService.getUserById(request.user.userId);
    }
}