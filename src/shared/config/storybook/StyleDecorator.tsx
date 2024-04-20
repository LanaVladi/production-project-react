import 'app/styles/index.scss';
// import React, { FC, ReactNode } from 'react';

// interface Props {
//     children?: ReactNode;
// }

// export const StyleDecorator: FC = ({ children }: Props) => <div>{children}</div>;

// // export default StyleDecorator;

import { StoryFn } from '@storybook/react';
// import { Theme } from '../../../app/providers/themeProvider/index';

export const StyleDecorator = (StoryComponent: StoryFn) => (
    <StoryComponent />
);
