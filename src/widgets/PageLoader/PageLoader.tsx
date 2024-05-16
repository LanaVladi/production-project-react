import { Loader } from '../../shared/ui/Loader/Loader';
import cls from './PageLoader.module.scss';
import { classNames } from '../../shared/lib/classNames/classNames';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(cls.pageloader, {}, [className])}>
        <Loader />
    </div>
);
