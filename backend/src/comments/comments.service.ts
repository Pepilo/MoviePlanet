import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentsService {

    constructor(private readonly databaseService : DatabaseService) {};

    async getComments() {
        try {

            const query = `SELECT id_user, id_movie, content FROM comments`;

            const result = await this.databaseService.runQuery(query);

            return result;

        } catch(err) {
            throw new Error('Failed to get comments.');
        }
    }

    async getCommentById(id : string) {
        try {

            const query = `SELECT id_user, id_movie, content FROM comments WHERE id = $1`;

            const result = await this.databaseService.runQuery(query, [id]);

            return result;

        } catch(err) {
            throw new Error('Failed to get comment.');
        }
    }

    async createComment(id_user : number, id_movie : number, content : string) {
        try {

            const query = `INSERT INTO comments (id_user, id_movie, content) VALUES ($1, $2, $3)`;

            await this.databaseService.runQuery(query, [id_user, id_movie, content]);

            return {message : 'Comment successfully created.'};

        } catch(err) {
            throw new Error('Failed to create comment.');
        }
    }

    async updateComments(id : string, content : string) {
        try {

            const query = `UPDATE comments SET content = $2 WHERE id = $1`;

            await this.databaseService.runQuery(query, [id, content]);

            return {message : 'Content successfully updated.'};

        } catch(err) {
            throw new Error('Failed to update content.');
        }
    }

    async deleteComments(id : string) {
        try {

            const query = `DELETE FROM comments WHERE id = $1`;

            await this.databaseService.runQuery(query, [id]);

            return {message : 'Comment successfully deleted.'};

        } catch(err) {
            throw new Error('Failed to delete comment.');
        }
    }
}
