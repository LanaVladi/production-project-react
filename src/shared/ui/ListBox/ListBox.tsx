import { Fragment, ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import clss from './ListBox.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import { HStack } from '../Stack';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}
type DropdownDirection = 'top' | 'bottom';

export interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: <T extends string>(value: T) => void;
    readonly?: boolean;
    label?: string;
    direction?: DropdownDirection;
}

// const mapDirectionClass: Record<DropdownDirection, string> = {
//     bottom: clss.optionsBottom,
//     top: clss.optionsTop,
// };   // либо можно через маппер сделать

export function ListBox(props: ListBoxProps) {
    const {
        items, className, onChange, defaultValue, value, label, readonly, direction,
    } = props;

    const optionsClasses = [clss[direction || 'bottom']];
    // const optionsClasses = [mapDirectionClass[direction]]; // либо можно через маппер сделать

    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}
            <HListbox
                as="div"
                className={classNames(clss.listBox, {}, [className])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListbox.Button disabled={readonly} className={clss.trigger}>
                    <Button disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>
                </HListbox.Button>
                <HListbox.Options className={classNames(clss.options, {}, optionsClasses)}>
                    {items?.map((item) => (
                        <HListbox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        clss.item,
                                        {
                                            [clss.active]: active,
                                            [clss.disabled]: item.disabled,
                                        },
                                    )}
                                >
                                    {selected && '!!!!!'}
                                    {item.content}
                                </li>
                            )}
                        </HListbox.Option>
                    ))}
                </HListbox.Options>
            </HListbox>
        </HStack>
    );
}
