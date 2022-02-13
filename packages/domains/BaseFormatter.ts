export interface IBaseFormatter {
    capitalize(word): string;
};

export class BaseFormatter {
    capitalize(word): string {
        const str = `${word}`;
        return str[0].toUpperCase() + str.slice(1);
    }
};
