import { LoginSchema } from '../types/LoginSchema';
import { loginActions, loginReducer } from './LoginSlice';

describe('LoginSlice.test', () => {
    test('should return decrement value', () => {
        const state: DeepPartial<LoginSchema> = { username: '123' };
        expect(loginReducer(state as LoginSchema, loginActions.setUsername('555'))).toEqual({ username: '555' });
    });

    test('should return increment value', () => {
        const state: DeepPartial<LoginSchema> = { password: '123' };
        expect(loginReducer(state as LoginSchema, loginActions.setPassword('333'))).toEqual({ password: '333' });
    });
});
