import { Api, userMockDriver } from '../utils/api';

function makeUser(id, firstName, lastName, companyName, ssn) {
return { id: id, first_name: firstName, last_name: lastName, company_name: companyName, ssn: ssn };
}

describe('Given that we have a healthy service', () => {
  describe('Get user details route', () => {
    describe('Given the user does not exist', () => {
      it('should return a HTTP 404', async () => {
        const userId = '3e920f54-49df-4d0b-b11b-e6f08e3a2dca';
        userMockDriver.setReturnData([]);
        await Api.get(`/user/v1/${userId}`).expect(404);
      });
    });

    describe('Given the user exists', () => {
      it('should return the user in JSON along with a HTTP 200', async () => {
        const userId = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474';
        userMockDriver.setReturnData(makeUser('da140a29-ae80-4f0e-a62d-6c2d2bc8a474', 'jeppe', 'rindom', 'pleo', '1'));
        await Api.get(`/user/v1/${userId}`).expect(200);
      });
    });
  });
});