import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {

    constructor(private readonly commentsService : CommentsService) {};

    @Get()
    getComments() {
        return this.commentsService.getComments();
    }

    @Get(':/id')
    getCommentById(@Param('id') id : string) {
        return this.commentsService.getCommentById(id);
    }

    @Post()
    createComment(@Body() body : {id_user : number, id_movie : number, content : string}) {
        return this.commentsService.createComment(body.id_user, body.id_movie, body.content);
    }

    @Put(':/id')
    updateComment(@Param('id') id : string, @Body() body : {content : string}) {
        return this.commentsService.updateComments(id, body.content);
    }

    @Delete(':/id')
    deleteComment(@Param('id') id : string) {
        return this.commentsService.deleteComments(id);
    }
}
