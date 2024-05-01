export type Mods = Record<string, boolean | string | undefined>

// const obj: Modes = {
//     'hovered': true,
//     'selectable': true,
//     'red': false,
// }

export function classNames(
    clss: string,
    modes: Mods = {},
    additional: Array<string | undefined> = [],
): string {
    const modesModified = Object.entries(modes)
        .filter(([_, booleanValue]) => Boolean(booleanValue))
    // [Array(2), Array(2)] => [ ['hovered', true], ['selectable', true] ]
        .map(([className]) => className); // ['hovered', 'selectable']

    return [
        clss,
        ...additional.filter((Boolean)),
        ...modesModified,
    ].join(' ');
}

// classNames(
//     'remove-btn',
//     { hovered: true, selectable: true, red: false },
//     ['padding'],
// ); // => 'remove-btn hovered selectable padding'
