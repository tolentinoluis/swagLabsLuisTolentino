import 'dotenv/config';
import { Sites } from '@type/sites';
import { Clients } from '@type/clients';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Config: Sites = {
  baseURL: 'https://jsonplaceholder.typicode.com',
  sample: 'https://randomuser.me',
  universityURL: 'http://universities.hipolabs.com',
  tradeMe: 'https://api.tmsandbox.co.nz/v1'
};

const getToken = (): string => {
  if (process.env.token) {
    return process.env.token;
  } else {
    throw new Error('No oauthToken was set for client. Add environment variable token');
  }
};

const getTokenSecret = (): string => {
  if (process.env.tokensecret) {
    return process.env.tokensecret;
  } else {
    throw new Error('No oauthTokenSecret was set for the client. Add environment variable tokensecret');
  }
};

const getKey = (): string => {
  if (process.env.key) {
    return process.env.key;
  } else {
    throw new Error('No consumerKey was set for the client. Add environment variable key');
  }
};

const getKeySecret = (): string => {
  if (process.env.keysecret) {
    return process.env.keysecret;
  } else {
    throw new Error('No consumerSecret was set for the client. Add environment variable keysecret');
  }
};

export const clients: Clients = {
  testClient: {
    oauthToken: getToken(),
    oauthTokenSecret: getTokenSecret(),
    consumerKey: getKey(),
    consumerSecret: getKeySecret()
  }
};