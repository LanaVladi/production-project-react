import React, { InputHTMLAttributes, FC, memo } from 'react';
import clss from './Input.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>
// TS сообщает нам, что внутри свойства InputHTMLAttributes<HTMLInputElement> уже есть  value и onChange
// и их типы не соответсвуют указанными нами типам string  и  (value: string) => потому что  в onChange вместо value => event.
//  И мы можем переопределить эти типы с помощью typescript Omit

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    type?: string;
    placeholder?: string;
    readonly?: boolean;
}

export const Input: FC<InputProps> = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        readonly,
        ...otherProps
    } = props;

    const mods: Mods = {
        [clss.readonly]: readonly,
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(clss.InputWrapper, {}, [className])}>
            {placeholder && (<div className={clss.placeholder}>{placeholder}</div>)}

            <input type={type} value={value} onChange={onChangeHandler} readOnly={readonly} {...otherProps} />
        </div>
    );
});
