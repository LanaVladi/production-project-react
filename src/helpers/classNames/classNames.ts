type Modes = Record<string, boolean | string>;

// const obj: Modes = {
//     'hovered': true,
//     'selectable': true,
//     'red': false,
// }

export function classNames(clss: string, modes: Modes, additional: string[]): string {

    const modesModified = Object.entries(modes)
        .filter(([className, booleanValue]) => Boolean(booleanValue)) //[Array(2), Array(2)] => [ ['hovered', true], ['selectable', true] ]        
        .map(([className, booleanValue]) => className); // ['hovered', 'selectable']

    // console.log('modesModified', modesModified);

    return [clss,
        ...additional,
        ...modesModified
    ].join(' ');
}


classNames('remove-btn', { hovered: true, selectable: true, red: false }, ['padding']); // => 'remove-btn hovered selectable padding'