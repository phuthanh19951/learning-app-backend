import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UsersActionsRepository } from './users-actions.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, UsersActionsRepository])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
