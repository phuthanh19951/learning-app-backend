import { get } from 'lodash';
import { Seeder, Factory } from "typeorm-seeding";
import * as axios from "axios";
import { Connection } from "typeorm";

import { User } from "../../users/entities/user.entity";

export default class CreateUserSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const result = await axios.default.get('https://dummyapi.io/data/v1/user?limit=50', { 
      headers: {
        "app-id": "6263e7a412d916608619e0e5"
      }
    });

    const dummyUsers = get(result, ['data', 'data'], []);

    if (dummyUsers.length > 0) {
      await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(dummyUsers.map(({ firstName, lastName, title, picture }) => {
        return {
          firstName,
          lastName,
          title,
          picture
        }
      }))
      .execute()
    }
  }
}