import { Api, expenseMockDriver } from '../utils/api';

function makeExpense(id, merchantName, amountInCents, currency, userId, dateCreated, status) {
    return { id: id, merchant_name: merchantName, amount_in_cents: amountInCents, currency: currency, user_id: userId, date_created: dateCreated, status: status };
}

const mockedExpenses = [
    makeExpense('3e920f54-49df-4d0b-b11b-e6f08e3a2dca', 'Cafe 22',  8000, 'DKK', 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474', '2021-09-21 20:57:40.021428', 'pending'),
    makeExpense('3e920f54-49df-4d0b-b11b-e6f08e3a2dca', 'Cafe 22',  8000, 'DKK', 'e17825a6-ad80-41bb-a76b-c5ee17b2f29d', '2021-09-21 20:57:40.021428', 'pending'),
    makeExpense('314d54f4-8a5f-4c1d-b735-426b54794a44', 'Sliders', 12000, 'DKK', 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474', '2021-09-21 20:57:40.021428', 'processed')
];

describe('Given that we have a healthy service', () => {
    describe('Get user expenses route', () => {
        describe('If user exists with no expenses', () => {
            it('should return an empty list of expenses for that user in JSON along with a HTTP 200', async () => {
                const userId = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474';
                expenseMockDriver.setReturnData([]);
                await Api.get(`/user/v1/${userId}`).expect(200);
            });
        });

        describe('If user exists with expenses', () => {
            it('should return an empty list of expenses for that user in JSON along with a HTTP 200', async () => {
                const userId = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474';
                expenseMockDriver.setReturnData(mockedExpenses.filter(e => e.user_id === userId));
                let result = await Api.get(`/user/v1/${userId}/expenses`);

                expect(result.status).toBe(200);
                let items = JSON.parse(result.body);
                expect(items.Length).toBe(2);
            });
        });
    });
});
