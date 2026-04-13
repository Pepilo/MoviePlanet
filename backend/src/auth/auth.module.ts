import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleOptions } from '@nestjs/jwt';
import { StringValue } from 'ms';

@Module({
    imports : [
        ConfigModule,
        DatabaseModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService : ConfigService): Promise<JwtModuleOptions> => {
                const secret = configService.get<string>('JWT_SECRET');
                console.log('JWT_SECRET:', secret);

                return {
                    secret,
                    signOptions: {
                        expiresIn:
                            (configService.get<string>('JWT_EXPIRES_IN') as StringValue) || '1h',
                    },
                };
            },
        }),
    ],
    controllers : [AuthController],
    providers : [AuthService],
    exports : [JwtModule],
})
export class AuthModule {}
