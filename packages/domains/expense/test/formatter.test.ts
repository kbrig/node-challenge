import { capitalize, format, formatAll, secureTrim } from '../formatter';

describe('[Packages | Expense-domain | Formatter] capitalize', () => {
    test('capitalize should make the first character as a capital letter', () => {
      return expect(capitalize('mario')).toEqual('Mario');
    });
  
    test('capitalize should do nothing on already capitalized word', () => {
      return expect(capitalize('Mario')).toEqual('Mario');
    });
  
    test('capitalize should do nothing on numbers', () => {
      return expect(capitalize(123)).toEqual('123');
    });
  
    test('capitalize should do nothing on strings of numbers', () => {
      return expect(capitalize('123')).toEqual('123');
    });
  });


describe('[Packages | Expense-domain | Formatter] secureTrim', () => {
    test('secureTrim should remove fields that are not defined in the list of public fields', () => {
      return expect(secureTrim([{
        id: '1',
        merchant_name: 'pleo',
        amount_in_cents: 100,
        currency: "£",
        user_id: '1',
        date_created: new Date(2000, 1, 1),
        status: 'Pending'
      }])).toEqual(JSON.stringify([{
        merchant_name: 'pleo',
        amount_in_cents: 100,
        currency: "£",
        date_created: new Date(2000, 1, 1),
        status: 'Pending'
      }]));
    });
  });
  
describe('[Packages | Expense-domain | Formatter] formatAll', () => {
  test('format should return an instance of an expense array that fits the API model, based on the db raw values', () => {
    return expect(formatAll([{
      id: '1',
      merchant_name: 'pleo',
      amount_in_cents: 100,
      currency: "£",
      user_id: '1',
      date_created: new Date(2000, 1, 1),
      status: 'Pending'
    },{
      id: '2',
      merchant_name: 'saintsburys',
      amount_in_cents: 700,
      currency: "£",
      user_id: '1',
      date_created: new Date(2000, 1, 1),
      status: 'Completed'
    }])).toEqual([{
      id: '1',
      merchant_name: 'Pleo',
      amount_in_cents: 100,
      currency: "£",
      user_id: '1',
      date_created: new Date(2000, 1, 1),
      status: 'Pending'
    },{
      id: '2',
      merchant_name: 'Saintsburys',
      amount_in_cents: 700,
      currency: "£",
      user_id: '1',
      date_created: new Date(2000, 1, 1),
      status: 'Completed'
    }]);
  });
});

describe('[Packages | Expense-domain | Formatter] format', () => {
  test('format should return an instance of users that fits the API model, based on the db raw value', () => {
    return expect(format({
      id: '1',
      merchant_name: 'pleo',
      amount_in_cents: 100,
      currency: "£",
      user_id: '1',
      date_created: new Date(2000, 1, 1),
      status: 'Pending'
    })).toEqual({
      id: '1',
      merchant_name: 'Pleo',
      amount_in_cents: 100,
      currency: "£",
      user_id: '1',
      date_created: new Date(2000, 1, 1),
      status: 'Pending'
    });
  });
});