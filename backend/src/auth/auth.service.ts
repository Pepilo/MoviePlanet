import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export type AuthBody = {email : string, password : string};

@Injectable()
export class AuthService {

    constructor(private readonly databaseService: DatabaseService, private readonly userService: UserService, private readonly jwtService : JwtService) {}

    async loginUser({authBody} : {authBody : AuthBody}) {

        const {email, password} = authBody;

        const query = `SELECT * FROM movieplanetusers WHERE email = $1`;

        const result = await this.databaseService.runQuery(query, [email]);

        const existingUser = result.rows?.[0];

        if(!existingUser) {
            throw new Error("L'utilisateur n'existe pas.");
        }

        const isPasswordValid = await this.isPasswordValid(password, existingUser.password);

        if(!isPasswordValid) {
            throw new Error("Mot de passe invalide.");
        }

        return this.authenticateUser(existingUser.id);
    }

    //Add a user in movieplanetusers table
    async registerUser(email: string, password: string, login: string) {
        try {

            const checkQuery = `SELECT * FROM movieplanetusers WHERE email = $1`;

            const checkResult = await this.databaseService.runQuery(checkQuery, [email]);

            const existingUser = checkResult.rows?.[0];

            if(existingUser) {
                return {message : ('A user with this email adress already exist.')};
            }

            const hashedPassword = await this.hashPassword(password);

            const createdUser = await this.userService.createUser(email, hashedPassword, login);

            return this.authenticateUser(createdUser.id);

        } catch (err) {
            throw new Error('Failed to register user.');
        }
    }

    private async hashPassword(password : string) {

        const hashedPassword = await hash(password, 10);

        return hashedPassword;
    }

    private async isPasswordValid(password : string, hashedPassword : string) {

        const isPasswordValid = await compare(password, hashedPassword);

        return isPasswordValid;
    }

    private async authenticateUser(userId : string){
        const payload = {userId};
        return {
            access_token: await this.jwtService.sign(payload),
        };
    }
}
