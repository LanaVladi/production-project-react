
import { classNames } from "./classNames";

describe('classNames', () => {
    test('with only param', () => {
        // expect(true).toBe(true);
        expect(classNames('someClass')).toBe('someClass');
    })

    test('with additional class', () => {
        const expected = 'someClass class1 class2';
        expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(expected);
    })

    test('with mods class', () => {
        const expected = 'someClass class1 class2 hovered selectable';
        expect(classNames('someClass', { hovered: true, selectable: true,}, ['class1', 'class2'])).toBe(expected);
    })

    test('with mods false', () => {
        const expected = 'someClass class1 class2 hovered';
        expect(classNames('someClass', { hovered: true, scorllable: false,}, ['class1', 'class2'])).toBe(expected);
    })

    test('with mods undefined', () => {
        const expected = 'someClass class1 class2 hovered';
        expect(classNames('someClass', { hovered: true, scorllable: undefined,}, ['class1', 'class2'])).toBe(expected);
    })

})