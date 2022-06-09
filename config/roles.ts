import 'dotenv/config';
import { ConfigRoles } from '@type/credentials';

const password = process.env.testpassword;

export const roles: ConfigRoles = {
  USER: {
    STANDARD: {
      USERNAME: 'standard_user',
      PASSWORD: password,
    }
  }
};
