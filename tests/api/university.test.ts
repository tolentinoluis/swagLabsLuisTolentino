import { expect } from 'chai';
import { University } from '@services/sample/university';
import { StatusCode } from '@constants/http-response-codes';
import { MyTradeMe } from '@services/sample/trade-me';

describe('Get sample data', function () {
  const getUniversity = new University();
  const myTradeMe = new MyTradeMe();

  const universities = {
    up: 'University of the philippines diliman',
    harvard: 'Harvard'
  };
  let universityInfo: string;
  let tradeMeSearch: string;
  let statusCode: number;

  before('Get random user data', async function () {
    await getUniversity.getUniversity({ name: universities.up }).then((response) => {
      universityInfo = response.data;
      statusCode = response.status;
    });
  });

  it('Should return a 200 success reponse code', async function () {
    await console.log(`----- Response Code: ${statusCode} -----`);
    expect(statusCode).to.equal(StatusCode.Ok);
  });

  it('Check data payload', async function () {
    await console.log('----- Check university details -----');
    console.log(universityInfo);
  });

  it('My TradeMe Sample', async function () {
    await myTradeMe.GetGeneralSearch().then((response) => {
      tradeMeSearch = response.data;
      console.log(tradeMeSearch);
    });
  });

});
