import { CounterSchema } from '../types/counterSchema';
import { counterActions, counterReducer } from './counterSlice';

describe('counterSlice.test', () => {
    test('should return decrement value', () => {
        const state: CounterSchema = { value: 10 };
        expect(counterReducer(state, counterActions.decrement())).toEqual({ value: 9 });
    });

    test('should return increment value', () => {
        const state: CounterSchema = { value: 10 };
        expect(counterReducer(state, counterActions.increment())).toEqual({ value: 11 });
    });

    test('should work with empty state', () => {
        const state: CounterSchema = undefined;
        expect(counterReducer(state, counterActions.increment())).toEqual({ value: 1 }); // initialState + 1
    });
});
