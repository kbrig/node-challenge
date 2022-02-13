import { IUserFormatter, User } from './types';

export class UserFormatter implements IUserFormatter {
  private publicFields = ['first_name', 'last_name', 'company_name'];

  capitalize(word) {
    const str = `${word}`;
    return str[0].toUpperCase() + str.slice(1);
  }

  secureTrim(user: User): string {
    return JSON.stringify(user, this.publicFields);
  }

  format(rawUser): User {
    return {
      id: rawUser.id,
      first_name: this.capitalize(rawUser.first_name),
      last_name: this.capitalize(rawUser.last_name),
      company_name: rawUser.company_name,
      ssn: rawUser.ssn,
    };
  }
}