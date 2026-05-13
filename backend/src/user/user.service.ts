import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class UserService {

    constructor(private readonly databaseService : DatabaseService) {};

    // Create a user in movieplanetusers table
    async createUser(email: string, hashedPassword: string, login: string) {
        try {
            const query = `INSERT INTO movieplanetusers (email, password, login, role) VALUES ($1, $2, $3, $4) RETURNING id`;

            const result = await this.databaseService.runQuery(query, [email, hashedPassword, login, 'user']);

            return result.rows[0];

        } catch (err) {
            throw new Error('Failed to create user.');
        }
    }

    // Get users from movieplanetusers table
    async getUsers() {
        try {
            const query = `SELECT login FROM movieplanetusers`;

            const result = await this.databaseService.runQuery(query);

            return result;

        } catch (err){
            throw new Error('Failed to get users.');
        }
    }

    // Get a user from movieplanetusers table by id
    async getUserById(id: number) {
        try {
            const query = `SELECT login FROM movieplanetusers WHERE id = $1`;

            const result = await this.databaseService.runQuery(query, [id]);

            return result;

        } catch (err){
            throw new Error('Failed to get user.');
        }
    }

    //Update a user from movieplanetusers table by id
    async updateUserById(id: number, password: string) {
        try {

            const query = `UPDATE movieplanetusers SET password = $2 WHERE id = $1`;

            await this.databaseService.runQuery(query, [id, password]);

            return this.getUserById(id);

        } catch(err) {
            throw new Error('Failed to update user.');
        }
    }

    //Delete a user from movieplanetusers table by id
    async deleteUserById(id: number) {
        try{

            const query = `DELETE FROM movieplanetusers WHERE id = $1`;

            await this.databaseService.runQuery(query, [id]);

            return this.getUsers();;

        } catch (err){
            throw new Error('Failed to delete user.');
        }
    }
}