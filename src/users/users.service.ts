import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateActionDto } from './dto/create-like-action.dto';
import { UsersActionsRepository } from './users-actions.repository';
import { In } from 'typeorm';
import { intersection } from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersActionsRepository: UsersActionsRepository,
  ) { }

  async findAll() {
    return await this.usersRepository.find();
  };

  async findOne(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async createAction(body: CreateActionDto) {
    return await this.usersActionsRepository.save(body);
  }

  async findLikedUsers(userId: string) {
    const likedUsers = await this.usersActionsRepository.find({ where: { userId, action: "like" } });
    const stuffIds = likedUsers.map(user => user.stuffId);
    return await this.usersRepository.find({ where: { id: In(stuffIds) } })
  }

  async findMatchedUsers(userId: string) {
    const likedUsers = await this.usersActionsRepository.find({ where: { userId, action: "like" } }) || [];
    const stuffUsers = await this.usersActionsRepository.find({ where: { stuffId: userId, action: "like" } }) || [];

    if (likedUsers.length > 0 && stuffUsers.length > 0) {
      const stuffusersIds = intersection([...likedUsers.map(user => user.stuffId)], [...stuffUsers.map(user => user.userId)]);
      if (stuffusersIds.length > 0) {
        return await this.usersRepository.find({ where: { id: In(stuffusersIds) } });
      }
    }

    return [];
  }

  async findUsersAtions(userId: string) {
    const likedUsers = await this.usersActionsRepository.find({ where: { userId } });
    const stuffIds = likedUsers.map(user => user.stuffId);
    return await this.usersRepository.find({ where: { id: In(stuffIds) } })
  }
}
