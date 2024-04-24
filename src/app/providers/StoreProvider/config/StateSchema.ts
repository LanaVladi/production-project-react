import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User/ui';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
}
