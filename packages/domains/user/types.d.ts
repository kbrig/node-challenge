import { IBaseFormatter } from "../BaseFormatter";

export interface User {
    id: string
    first_name: string
    last_name: string
    company_name: string
    ssn: string
}

export interface IUserRepository {
    readUser(userId: string);
}

export interface IUserController {
    getUserDetails(userId: string, readUserOverride?: Function): Promise<User>;
}

export interface IUserFormatter extends IBaseFormatter {
    secureTrim(user: User): string;
    format(rawUser): User;
}

export interface IUserRouter {
    getRouter();
}
 