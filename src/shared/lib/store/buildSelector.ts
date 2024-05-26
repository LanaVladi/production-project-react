import { useSelector } from 'react-redux';
import { StateSchema } from '../../../app/providers/StoreProvider';

type Selector<T> = (state: StateSchema) => T;
type Result<T> = [() => T, Selector<T>]

export function buildSelector<T>(selector: Selector<T>): Result<T> {
    const useSelectorHook = () => {
        return useSelector(selector);
    };

    return [useSelectorHook, selector];
}

// обертка над useSelector, чтобы в компонентах его постоянно не использовать, а использовать сразу кастомный хук
// не используем useSelector напрямую, а оборачиваем его в buildSelector, который возвращает нам хук и уже хук мы используем
