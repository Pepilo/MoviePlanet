import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class UserService {

    constructor(private readonly databaseService : DatabaseService) {};

    // Get users from users table
    async getUsers() {
        try {
            const query = `SELECT login FROM users`;

            const result = await this.databaseService.runQuery(query);

            return result;

        } catch (err){
            throw new Error('Failed to get users.');
        }
    }

    // Get a user from users table by id
    async getUserById(id: string) {
        try {
            const query = `SELECT login FROM users WHERE id = $1`;

            const result = await this.databaseService.runQuery(query, [id]);

            return result;

        } catch (err){
            throw new Error('Failed to get user.');
        }
    }

    //Add a user in users table
    async createUsers(login: string, password: string) {
        try {

            const query = `INSERT INTO users (login, password) VALUES ($1, $2)`;

            await this.databaseService.runQuery(query, [login, password]);

            return {message : 'User successfully created.'}

        } catch (err) {
            throw new Error('Failed to create user.');
        }
    }

    //Update a user from users table by id
    async updateUserById(id: string, password: string) {
        try {

            const query = `UPDATE users SET password = $2 WHERE id = $1`

            await this.databaseService.runQuery(query, [id, password]);

            return this.getUserById(id);

        } catch(err) {
            throw new Error('Failed to update user.')
        }
    }

    //Delete a user in users table by id
    async deleteUserById(id: string) {
        try{

            const query = `DELETE FROM users WHERE id = $1`;

            await this.databaseService.runQuery(query, [id]);

            return {message : 'User successfully deleted.'}

        } catch (err){
            throw new Error('Failed to delete user.')
        }
    }
}