import 'dotenv/config';
// import { Credentials } from '@type/credentials';

const password = process.env.testpassword;

export const roles = {
  USER: {
    STANDARD: {
      username: 'standard_user',
      password: password,
    }
  }
};
