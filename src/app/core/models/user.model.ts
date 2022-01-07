export interface User {
    id?: string;
    name: string;
    phone: string;
    email: string;
    password?: string;
    birthdate: string;
    verified?: boolean;
    token?: string;
}
