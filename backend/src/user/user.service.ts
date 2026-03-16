import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class UserService {

    constructor(private readonly databaseService : DatabaseService) {};

    // Get users from users table
    async getUsers() {
        try {
            const query = 'SELECT login, password FROM public.users';

            const result = await this.databaseService.runQuery(query);
        } catch (err){
            throw new Error('Failed to get users.');
        }
    }
}