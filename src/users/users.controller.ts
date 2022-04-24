import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Res, HttpStatus, Request } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateActionDto } from './dto/create-like-action.dto';
import { differenceBy } from 'lodash';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':id')
  async getAll(@Param('id') userId: string, @Res() res: Response) {
    const users = await this.usersService.findAll();
    const usersActions = await this.usersService.findUsersAtions(userId);
    const validUsers = differenceBy(users, usersActions, 'id');
    return res.status(HttpStatus.OK).json({ data: validUsers });
  }

  @Post('/fake-login')
  async fakeLogin(@Res() res: Response) {
    let user = null;
    const users = await this.usersService.findAll();
    if (users) {
      const randomUserIndex = Math.ceil(Math.random() * 50);
      user = users[randomUserIndex];
    }

    return res.status(HttpStatus.OK).json({ data: user });
  }

  @Post('/action')
  async createAction(@Body() body: CreateActionDto, @Res() res: Response) {
    try {
      const stuffUser = await this.usersService.findOne(body.stuffId);
      const currentUser = await this.usersService.findOne(body.userId);

      if (stuffUser && currentUser) {
        this.usersService.createAction(body);
      }

      return res.status(HttpStatus.CREATED).json({ success: true });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false });
    }
  }

  @Get(':id/like')
  async findLikedUsers(@Param('id') userId: string, @Res() res: Response) {
    let users = [];
    if (userId) {
      users = await this.usersService.findLikedUsers(userId);
    }

    return res.status(HttpStatus.OK).json({ data: users });
  }

  @Get(':id/match')
  async findMatchedUsers(@Param('id') userId: string, @Res() res: Response) {
    let users = [];
    if (userId) {
      users = await this.usersService.findMatchedUsers(userId);
    }

    return res.status(HttpStatus.OK).json({ data: users });
  }
}
