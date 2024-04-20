/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-no-useless-fragment */
import { StoryFn, Decorator } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// interface Props {
//     children?: ReactNode;
// }

// const RouterDecorator: FC = ({ children }: Props) => (
//     <BrowserRouter>
//         <div>{children}</div>
//     </BrowserRouter>
// );

// export default RouterDecorator;

const RouterDecorator = (StoryComponent: StoryFn) => (
    <BrowserRouter>
        <StoryComponent />
    </BrowserRouter>
);

export default RouterDecorator;

// const RouterDecorator: Decorator = (Story) => (
//     <BrowserRouter>
//         <>{<Story />}</>
//     </BrowserRouter>
// );

// export default RouterDecorator;

// import React, { FC } from 'react';
// import 'app/styles/index.scss';

// interface Props {
//     children?: React.ReactNode;
// }

// export const RouterDecorator: FC<Props> = ({ children }) => (
//     <BrowserRouter>{children}</BrowserRouter>
// );

// export default RouterDecorator;
