import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export type AuthBody = {login : string, password : string};

@Injectable()
export class AuthService {

    constructor(private readonly databaseService: DatabaseService, private readonly jwtService : JwtService) {}

    async loginUser({authBody} : {authBody : AuthBody}) {

        const {login, password} = authBody;

        const query = `SELECT * FROM users WHERE login = $1`;

        const result = await this.databaseService.runQuery(query, [login]);

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

    //Add a user in users table
    async createUsers(login: string, password: string) {
        try {

            const checkQuery = `SELECT * FROM users WHERE login = $1`;

            const checkResult = await this.databaseService.runQuery(checkQuery, [login]);

            const existingUser = checkResult.rows?.[0];

            if(existingUser) {
                return {message : (`L'utilisateur existe déjà.`)};
            }

            const hashedPassword = await this.hashPassword(password);

            const query = `INSERT INTO users (login, password) VALUES ($1, $2)`;

            await this.databaseService.runQuery(query, [login, hashedPassword]);

            const authQuery = `SELECT id FROM users WHERE login = $1`

            const idResult = await this.databaseService.runQuery(authQuery,[login]);

            const userId = idResult.rows[0].id;

            return this.authenticateUser(userId);

        } catch (err) {
            throw new Error('Failed to create user.');
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
