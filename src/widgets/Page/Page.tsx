import {
    memo, MutableRefObject, ReactNode, UIEvent, useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useThrottle } from '../../shared/lib/hooks/useThrottle/useThrottle';
import { useInitialEffect } from '../../shared/lib/hooks/useInitialEffect/useInitialEffect';
import { StateSchema } from '../../app/providers/StoreProvider';
import { getScrollRestorationByPath, scrollRestorationActions } from '../../features/ScrollRestoration';
import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '../../shared/lib/classNames/classNames';
import { useInfiniteScroll } from '../../shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const location = useLocation();
    const scrollPosition = useSelector((state: StateSchema) => getScrollRestorationByPath(state, location.pathname));

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition; // восстанавливаем позицию скролла из стейта
    });

    const scrollHandler = useThrottle((e:UIEvent<HTMLDivElement>) => {
        // console.log('scroll', e.currentTarget.scrollTop); // position in px from the very top point of the page
        // console.log('SCROLL');
        dispatch(scrollRestorationActions.setScrollPosition({
            path: location.pathname, // 'scrollPath'
            position: e.currentTarget.scrollTop, // отправляем в стейт позицию скролла
        }));
    }, 0);

    return (
        <main
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            onScroll={scrollHandler}
        >
            {children}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
        </main>
    );
});
