import { memo, useCallback } from 'react';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';
import { classNames } from '../../../shared/lib/classNames/classNames';
import CopyIcon from '../../assets/icons/copy-20-20.svg';
import clss from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(clss.Code, {}, [className])}>
            <Button onClick={onCopy} className={clss.copyBtn} theme={ButtonTheme.CLEAR}>
                <CopyIcon className={clss.copyIcon} />
            </Button>
            <code>
                {text}
            </code>
        </pre>
    );
});
