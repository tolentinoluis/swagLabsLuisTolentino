import { expect } from 'chai';
import { SampleLuis } from '@services/sample/sample';
import { StatusCode } from '@constants/http-response-codes';
import { Results } from '@type/user';

describe('Get sample data', function () {
  const sampleRequest = new SampleLuis();

  let userResults: Results;
  let statusCode: number;
  let gender: string;
  let name: object;
  let location: object;
  let street: object;
  let coordinates: object;
  let timezone: object;
  let email: string;
  let login: object;
  let dob: object;

  before('Get random user data', async function () {
    await sampleRequest.getRandomUser().then((response) => {
      userResults = response.data;
      const userData = userResults.results[0];

      statusCode = response.status;
      gender = userData.gender;
      name = userData.name;
      location = userData.location;
      street = userData.location.street;
      coordinates = userData.location.coordinates;
      timezone = userData.location.timezone;
      email = userData.email;
      login = userData.login;
      dob = userData.dob;
    });
  });

  it('Should return a 200 success reponse code', async function () {
    await console.log(`----- Response Code: ${statusCode} -----`);
    expect(statusCode).to.equal(StatusCode.Ok);
  });

  it('Check data payload', async function () {
    await console.log('----- Validate data -----');
    console.log(userResults.results[0]);

    expect(gender).to.be.an('String');

    expect(name).to.be.an('Object');
    expect(name).to.have.all.keys('title', 'first', 'last');

    expect(location).to.be.an('Object');
    expect(location).to.have.all.keys('street', 'city', 'state', 'country', 'postcode', 'coordinates', 'timezone');
    expect(street).to.have.all.keys('number', 'name');
    expect(coordinates).to.have.all.keys('latitude', 'longitude');
    expect(timezone).to.have.all.keys('offset', 'description');

    expect(email).to.be.an('String');
    expect(email).to.include('@');

    expect(login).to.be.an('Object');
    expect(login).to.have.all.keys('uuid', 'username', 'password', 'salt', 'md5', 'sha1', 'sha256');

    expect(dob).to.be.an('Object');
    expect(dob).to.have.all.keys('date', 'age');
  });

});
