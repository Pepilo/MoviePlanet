import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {

    constructor(private readonly movieService : MovieService) {};

    @Get()
    getMovies() {
        return this.movieService.getMovies();
    }

    @Get('/:id')
    getMovieById(@Param('id') id : string) {
        return this.movieService.getMovieById(id);
    }

    @Post()
    createMovie(@Body() body: {name : string, real : string, synopsis : string}) {
        return this.movieService.createMovie(body.name, body.real, body.synopsis);
    }

    @Put('/:id')
    updateMovie(@Param('id') id : string, @Body() body: {synopsis : string} ) {
        return this.movieService.updateMovieById(id, body.synopsis);
    }

    @Delete('/:id')
    deleteMovie(@Param('id') id : string) {
        return this.movieService.deleteMovieById(id);
    }
}
