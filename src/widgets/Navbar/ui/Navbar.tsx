import { classNames } from '../../../shared/lib/classNames/classNames';
import clss from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export function Navbar({ className }: NavbarProps) {
    return (
        <div className={classNames(clss.navbar, {}, [className])}>
            <div className={classNames(clss.links)}>
                /
            </div>

        </div>
    );
}
