import { StateSchema } from '../../../../../app/providers/StoreProvider';
import { ValidateProfileError } from '../../consts/consts';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors.test', () => {
    test('should work with filled state', () => {
        const validateErrors = [
            ValidateProfileError.SERVER_ERROR,
            ValidateProfileError.INCORRECT_AGE];

        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors,
            },
        };
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(validateErrors);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
    });
});
