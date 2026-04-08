import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

console.log(process.env.JWT_SECRET);
@Module({
    imports : [
        DatabaseModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '60s'},
        }),
    ],
    controllers : [AuthController],
    providers : [AuthService]
})
export class AuthModule {}
