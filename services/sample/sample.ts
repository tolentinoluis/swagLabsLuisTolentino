import axios, { AxiosResponse } from 'axios';
import { Config } from '@config/config';

export class SampleLuis {
  private readonly sample = Config.sample;

  // return a random user information in a JSON format
  async getRandomUser(): Promise<AxiosResponse<any>> {
    return await axios
      .get(`${this.sample}/api/`)
      .then((response) => response)
      .catch((error) => error.response);
  }
}
