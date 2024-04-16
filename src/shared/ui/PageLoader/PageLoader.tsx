import { Loader } from '../../../shared/ui/Loader/Loader';
import * as cls from './PageLoader.module.scss';
import { classNames } from '../../../shared/lib/classNames';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(cls.pageloader, {}, [className])}>
        <Loader />
    </div>
);
