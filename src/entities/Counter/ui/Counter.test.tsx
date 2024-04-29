import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import userEvent from '@testing-library/user-event';
import { StateSchema } from 'app/providers/StoreProvider';
import { Counter } from './Counter';

describe('Counter', () => {
    test('test render Counter component', () => {
        const initialState = { counter: { value: 10 } };
        componentRender(<Counter />, { initialState });
        expect(screen.getByTestId('value-title')).toHaveTextContent('10');
    });

    test('test: increment toggle Counter twice', () => {
        const initialState = { counter: { value: 10 } };
        componentRender(<Counter />, { initialState });
        const incrementBtn = screen.getByTestId('increment-btn');
        expect(screen.getByTestId('increment-btn')).toBeInTheDocument();
        fireEvent.click(incrementBtn);
        fireEvent.click(incrementBtn);
        expect(screen.getByTestId('value-title')).toHaveTextContent('12');
    });

    test('test: decrement toggle Counter', () => {
        const initialState = { counter: { value: 10 } };
        componentRender(<Counter />, { initialState });
        const decrementBtn = screen.getByTestId('decrement-btn');
        expect(screen.getByTestId('decrement-btn')).toBeInTheDocument();
        fireEvent.click(decrementBtn);
        expect(screen.getByTestId('value-title')).toHaveTextContent('9');
    });

    test('test: decrement toggle Counter', async () => {
        const user = userEvent.setup();
        const initialState: DeepPartial<StateSchema> = { counter: { value: 10 } };
        componentRender(<Counter />, { initialState });
        const decrementBtn = screen.getByTestId('decrement-btn');
        await user.click(decrementBtn);
        expect(screen.getByTestId('value-title')).toHaveTextContent('9');
    }); // userEvent by @testing-library/user-event // npm install --save-dev @testing-library/user-event @testing-library/dom
});
