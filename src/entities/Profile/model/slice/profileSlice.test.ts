import { profileActions, profileReducer } from './profileSlice';
import { Currency } from '../../../../entities/Currency';
import { Country } from '../../../../entities/Country';
import { ProfileSchema, ValidateProfileError } from '../types/profile';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const data = {
    username: 'admin',
    age: 22,
    country: Country.Ukraine,
    lastname: 'ulbi tv',
    first: 'asd',
    city: 'asf',
    currency: Currency.USD,
};

describe('profileSlice.test', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({ readonly: true });
    });

    test('test cancelEdit', () => {
        const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };

        expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit())).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data,
        });
    });
});

test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: '123' } };

    expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({ username: '123456' })))
        .toEqual({ form: { username: '123456' } });
});

test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
        isLoading: false,
        validateErrors: [ValidateProfileError.SERVER_ERROR],
    };

    expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual({
        isLoading: true,
        validateErrors: undefined,
    });
});

test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: true };

    expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, ''))).toEqual({
        isLoading: false,
        readonly: true,
        validateErrors: undefined,
        data,
        form: data,
    });
});

// cancelEdit: (state) => {
//     state.readonly = true;
//     state.validateErrors = undefined;
//     state.form = state.data; // возвращаем в форме значения с сервера
// },
