import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MovieService {

    constructor(private readonly databaseService : DatabaseService) {};

    // Get movies from movies table
    async getMovies() {
        try {
            const query = `SELECT name, real, synopsis FROM movies`;

            const result = await this.databaseService.runQuery(query);

            return result;

        } catch (err){
            throw new Error('Failed to get movies.');
        }
    }

    // Get a movie from movies table by id
    async getMovieById(id : string) {
        try{
            const query = `SELECT name, real, synopsis FROM movies WHERE id = $1`;

            const result = await this.databaseService.runQuery(query, [id]);

            return result;

        } catch (err) {
            throw new Error('Failed to get movie.');
        }
    }

    // Add a movie in movies table
    async createMovie(name: string, real: string, synopsis: string) {
        try {
            const query = `INSERT INTO movies (name, real, synopsis) VALUES ($1, $2, $3)`;

            await this.databaseService.runQuery(query, [name, real, synopsis]);

            return {message :'Movie successfully created.'};

        } catch(err) {
            throw new Error ('Failed to create movie.');
        }
    }

    // Update a movie in movies table by id
    async updateMovieById(id: string, synopsis: string) {
        try {
            const query = `UPDATE movies SET synopsis = $2 WHERE id = $1`;

            await this.databaseService.runQuery(query, [id, synopsis]);

            return {message: 'Movie successfully updated.'};

        } catch(err) {
            throw new Error('Failed to update movie.');
        }
    }

    // Delete a movie in movies table by id
    async deleteMovieById(id: string) {
        try {
            const query = `DELETE FROM movies WHERE id = $1`;

            await this.databaseService.runQuery(query, [id]);

            return {message: 'Movie successfully deleted.'}

        } catch(err) {
            throw new Error('Failed to delete movie.');
        }
    }
}
