import { expect } from 'chai';
import { SampleLuis } from '@services/sample/sample';
import { StatusCode } from '@constants/http-response-codes';
import { Results } from '@type/user';

describe('Get sample data', function () {
  const sampleRequest = new SampleLuis();
  let email: string;
  let firstName: string;
  let lastName: string;
  let streetNumber: number;
  let streetName: string;

  it('should return random user information', async function () {
    await sampleRequest.getRandomUser().then((response) => {
      const userResults: Results = response.data;
      const userData = userResults.results[0];
      const returnCode = response.status;

      email = userData.email;
      firstName = userData.name.first;
      lastName = userData.name.last;
      streetNumber = userData.location.street.number;
      streetName = userData.location.street.name;

      console.log(userResults);
      console.log(`----- Email: ${email} -----`);
      console.log(`----- First Name: ${firstName} -----`);
      console.log(`----- Last Name: ${lastName} -----`);
      console.log(`----- address: ${streetNumber} ${streetName} -----`);
      expect(returnCode).to.equal(StatusCode.Ok);
    });
  });

});
