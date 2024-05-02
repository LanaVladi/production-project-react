export interface User {
    id: string;
    username: string;
}

export interface UserSchema {
    authData?: User;

    _inited: boolean; // флаг, по которому определяем авторизован пользователь или нет
}
