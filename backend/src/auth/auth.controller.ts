import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBody } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor (private readonly authService : AuthService) {}

    @Post()
    loginUser(@Body() authBody: AuthBody) {
        return this.authService.loginUser({authBody});
    }
}
