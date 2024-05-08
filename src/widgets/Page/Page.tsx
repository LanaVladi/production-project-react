import {
    memo, MutableRefObject, ReactNode, UIEvent, useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import { scrollRestorationActions } from '../../features/ScrollRestoration';
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

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        // callback: () => console.log('callback'),
        callback: onScrollEnd,
    });

    const scrollHandler = (e:UIEvent<HTMLDivElement>) => {
        // console.log('scroll', e.currentTarget.scrollTop); // position in px from the very top point of the page
        dispatch(scrollRestorationActions.setScrollPosition({
            path: location.pathname, // 'scrollPath'
            position: e.currentTarget.scrollTop,
        }));
    };

    return (
        <section
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            onScroll={scrollHandler}
        >
            {children}
            <div ref={triggerRef} />
        </section>
    );
});
