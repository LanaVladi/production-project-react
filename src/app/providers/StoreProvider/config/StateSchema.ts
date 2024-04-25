import { LoginSchema } from '../../../../features/AuthByUsername/ui';
import { CounterSchema } from '../../../../entities/Counter';
import { UserSchema } from '../../../../entities/User';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    LoginForm?: LoginSchema;
}
