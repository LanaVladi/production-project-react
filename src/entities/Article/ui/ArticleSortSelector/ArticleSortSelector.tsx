import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Select, SelectOption } from '../../../../shared/ui/Select/Select';
import { ArticleSortField } from '../../../../entities/Article/model/consts/articleConsts';
import { SortOrder } from '../../../../shared/types';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {
        className, onChangeOrder, onChangeSort, order, sort,
    } = props;
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('asc'),
        },
        {
            value: 'desc',
            content: t('desc'),
        },
    ], [t]);

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: t('created'),
        },
        {
            value: ArticleSortField.TITLE,
            content: t('title'),
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('views'),
        },
    ], [t]);

    // const changeSortHandler = useCallback((newSort: string) => {
    //     onChangeSort(newSort as ArticleSortField); // так в проде не делать, можно воспользоваться дженерик компонентами
    // }, [onChangeSort]);

    // const changeOrderHandler = useCallback((newOrder: string) => {
    //     onChangeOrder(newOrder as SortOrder); // так в проде не делать, можно воспользоваться дженерик компонентами
    // }, [onChangeOrder]);

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select<ArticleSortField>
                options={sortFieldOptions}
                label={t('Sort by')}
                value={sort}
                onChange={onChangeSort}
            />
            <Select<SortOrder>
                options={orderOptions}
                label={t('by')}
                value={order}
                onChange={onChangeOrder}
                className={cls.order}
            />
        </div>
    );
});
