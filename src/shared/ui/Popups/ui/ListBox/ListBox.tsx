import { Fragment, ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import clss from './ListBox.module.scss';
import { classNames } from '../../../../lib/classNames/classNames';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';
import { DropdownDirection } from '../../../../types/ui';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}
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

export function ListBox(props: ListBoxProps) {
    const {
        items, className, onChange, defaultValue, value, label, readonly, direction = 'bottom right',
    } = props;

    // const optionsClasses = [clss[direction || 'bottom right']];
    const optionsClasses = [mapDirectionClass[direction]]; // либо можно через маппер сделать

    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}
            <HListbox
                as="div"
                className={classNames(clss.listBox, {}, [className, popupCls.popup])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListbox.Button disabled={readonly} className={popupCls.trigger}>
                    <Button disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>
                    {/* // react-dom.development.js:67 Warning: validateDOMNesting(...): <button> cannot appear as a descendant of <button>. */}
                    {/* TO DO: FIX IT!!! */}
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
                                            [popupCls.active]: active,
                                            [popupCls.disabled]: item.disabled,
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
