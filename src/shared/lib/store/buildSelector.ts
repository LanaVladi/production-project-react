import { useSelector } from 'react-redux';
import { StateSchema } from '../../../app/providers/StoreProvider';

// type Selector<T> = (state: StateSchema) => T;
// type Result<T> = [() => T, Selector<T>]

// export function buildSelector<T>(selector: Selector<T>): Result<T> {
//     const useSelectorHook = () => {
//         return useSelector(selector);
//     };

//     return [useSelectorHook, selector];
// }

// обертка над useSelector, чтобы в компонентах его постоянно не использовать, а использовать сразу кастомный хук
// не используем useSelector напрямую, а оборачиваем его в buildSelector, который возвращает нам хук и уже хук мы используем

type Selector<T, Args extends any[]>= (state: StateSchema, ...args: Args) => T;
type Hook<T, Args extends any[]> = (...args: Args) => T;
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>]

export function buildSelector<T, Args extends any[]>(selector: Selector<T, Args>): Result<T, Args> {
    const useSelectorHook: Hook<T, Args> = (...args: Args) => {
        return useSelector((state: StateSchema) => selector(state, ...args));
    };

    return [useSelectorHook, selector];
}
