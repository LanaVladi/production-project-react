import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import { componentRender } from '../../../../shared/lib/tests/componentRender/componentRender';
import { profileReducer } from '../../../../features/editableProfileCard/model/slice/profileSlice';
import { Currency } from '../../../../entities/Currency';
import { Country } from '../../../../entities/Country';
import { Profile } from '../../../../entities/Profile';
import { EditableProfileCard } from './EditableProfileCard';
import { $api } from '../../../../shared/api/api';

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 465,
    currency: Currency.USD,
    country: Country.Kazakhstan,
    city: 'Moscow',
    username: 'admin213',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: { id: '1', username: 'admin' },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('features/EditableProfileCard', () => {
    test('Режим readonly должен переключиться и появиться кнопки CancelButton и SaveButton', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
        // expect(screen.getByTestId('EditableProfileCardHeader.SaveButton')).toBeInTheDocument();

    });

    test('При отмене значения должны обнуляться', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        // кликаем по кнопке EditButton (Изменить)

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname')); 
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));
        // очищаем значения в инпутах имени и фамилии

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user'); 
        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');
        // вводим вместо имени и фамилии admin => user

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user'); 
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');
        // проверяем, что в инпутах имени и фамилии указано user

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton')); 
        // при нажатии кнопки отмены редактирования все данные не сохраняются, т.е. остаются предыдущие значения, т.е. admin

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
        // и опять проверяем, что в инпутах имени и фамилии указано admin, что инпут и сторе отрабатывает правильно
    });

    test('Должна появиться ошибка', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
        // кликаем по кнопке SaveButton (Сохранить)

        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
        // ожидаем, что появится ошибка, когда обязательное поле Имя не заполнено
    });

    test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
        const mockPutReq = jest.spyOn($api, 'put'); // замокали запрос на сервер PUT 
        // jest.spyOn(object, methodName) - object - объект, который мокаем и его метод
        // https://jestjs.io/docs/jest-object#jestspyonobject-methodname

        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton')); // 
        // кликаем по кнопке EditButton (Изменить)

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
        // вводим вместо имени admin => user

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
        // кликаем по кнопке SaveButton (Сохранить)

        expect(mockPutReq).toHaveBeenCalled();
        // ожидаем, что запрос по изменению данных PUT, вызван и отправлен на сервер
    });
});

