import axios, { AxiosResponse } from 'axios';
import { Config } from '@config/config';

export class University {
  private readonly university = Config.universityURL;

  // return search of university in JSON format
  async getUniversity(options: {name: string}): Promise<AxiosResponse<any>> {
    return await axios
      .get(
        `${this.university}/search`, { params: { name: options.name } }
      );
  }
}
