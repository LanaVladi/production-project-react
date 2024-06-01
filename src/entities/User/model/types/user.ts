import { FeatureFlags } from '../../../../shared/types/featureFlags';
import { UserRole } from '../consts/userConsts';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[]; // обязательный или нет в зависимоости от того, как устроен бекенд, возвращает ли он всегда массив ролей
    features?: FeatureFlags;
}

export interface UserSchema {
    authData?: User;

    _inited: boolean; // флаг, по которому определяем авторизован пользователь или нет
}
