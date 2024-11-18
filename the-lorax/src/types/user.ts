export interface User {
    username: string;
    email: string;
    full_name: string;
    data_permissions: boolean;
    user_permissions: boolean;
}

export interface NewUser {
    username: string;
    email: string;
    full_name: string;
    password: string;
    data_permissions: boolean;
    user_permissions: boolean;
}

export interface ModifyUser {
    username?: string;
    email?: string;
    full_name?: string;
    password?: string;
    data_permissions?: boolean;
    user_permissions?: boolean;
}

export interface UsersProps {
    token: string;
}