// import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../shared/ui/Button/Button';
import { counterActions, useCounterActions } from '../model/slice/counterSlice';
import { getCounterValue, useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
    // const dispatch = useDispatch();
    // const counterValue = useSelector(getCounterValue);
    const counterValue = useCounterValue();
    const { t } = useTranslation();
    const { decrement, increment, add } = useCounterActions();

    const handleInc = () => {
        increment();
    };

    const handleDec = () => {
        decrement();
    };

    const handleAddFive = () => {
        add(5);
    };

    // const increment = () => {
    //     dispatch(counterActions.increment());
    // };

    // const decrement = () => {
    //     dispatch(counterActions.decrement());
    // };

    return (
        <div>
            <h1 data-testid="value-title">{`value: ${counterValue}`}</h1>
            <Button
                onClick={handleInc}
                data-testid="increment-btn"
            >
                {t('increment')}
            </Button>
            <Button
                data-testid="decrement-btn"
                onClick={handleDec}
            >
                {t('decrement')}
            </Button>
            <Button
                onClick={handleAddFive}
                data-testid="increment-btn5"
            >
                {t('add5')}
            </Button>
        </div>
    );
};
