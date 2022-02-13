import { UserFormatter } from '../UserFormatter';

describe('[Packages | User-domain | Formatter] capitalize', () => {
  let formatter: UserFormatter = new UserFormatter();
  test('capitalize should make the first character as a capital letter', () => {
    return expect(formatter.capitalize('mario')).toEqual('Mario');
  });

  test('capitalize should do nothing on already capitalized word', () => {
    return expect(formatter.capitalize('Mario')).toEqual('Mario');
  });

  test('capitalize should do nothing on numbers', () => {
    return expect(formatter.capitalize(123)).toEqual('123');
  });

  test('capitalize should do nothing on strings of numbers', () => {
    return expect(formatter.capitalize('123')).toEqual('123');
  });
});

describe('[Packages | User-domain | Formatter] secureTrim', () => {
  let formatter: UserFormatter = new UserFormatter();
  test('secureTrim should remove fields that are not defined in the list of public fields', () => {
    return expect(formatter.secureTrim({
      id: '1',
      first_name: 'John',
      last_name: 'Smith',
      company_name: 'Pleo',
      ssn: '1',
    })).toEqual(JSON.stringify({
      first_name: 'John',
      last_name: 'Smith',
      company_name: 'Pleo',
    }));
  });
});

describe('[Packages | User-domain | Formatter] format', () => {
  let formatter: UserFormatter = new UserFormatter();
  test('format should return an instance of users that fits the API model, based on the db raw value', () => {
    return expect(formatter.format({
      first_name: 'john',
      last_name: 'smith',
      company_name: 'Pleo',
      ssn: 1,
    })).toEqual({
      first_name: 'John',
      last_name: 'Smith',
      company_name: 'Pleo',
      ssn: 1,
    });
  });
});
