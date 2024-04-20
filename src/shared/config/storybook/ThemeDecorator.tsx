import { StoryFn } from '@storybook/react';
import { Theme } from '../../../app/providers/themeProvider/index';

const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryFn) => (
    <div className={`app ${theme}`}>
        <StoryComponent />
    </div>
);

export default ThemeDecorator;
