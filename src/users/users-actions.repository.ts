import { EntityRepository, Repository } from 'typeorm'
import { UserAction } from './entities/users_actions.entity'

@EntityRepository(UserAction)
export class UsersActionsRepository extends Repository<UserAction> {}

