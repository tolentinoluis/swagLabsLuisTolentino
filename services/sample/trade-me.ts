import axios, { AxiosResponse } from 'axios';
import { Config } from '@config/config';
// import { WatchlistFilter } from '@constant/watchlist-filter';
import { BaseService } from '@services/base';

export class MyTradeMe extends BaseService {

  GetGeneralSearch(): Promise<AxiosResponse<any>> {
    console.log(`${Config.tradeMe}/Search/General.json`);
    return axios.get(
      `${Config.tradeMe}/Search/General.json`,
      { headers: { Authorization: this.appAuthentication() } }
    );
  }
}