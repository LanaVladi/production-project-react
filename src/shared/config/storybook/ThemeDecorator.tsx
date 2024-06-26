// import { StoryFn } from '@storybook/react';
// import { Theme } from '../../../app/providers/themeProvider/index';

// const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryFn) => (
//     <div className={`app ${theme}`}>
//         <StoryComponent />
//     </div>
// );

// export default ThemeDecorator;

/// ///////////////////////////////////////////////////////////////////////////////////////////

import { Story } from '@storybook/react';
import { ThemeProvider } from '../../../app/providers/themeProvider';
import { Theme } from '../../../shared/const/theme';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
    <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
            <StoryComponent />
        </div>
    </ThemeProvider>
);
