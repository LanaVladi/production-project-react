import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    test('test render Sidebar component', () => {
        const SidebarWithTranslation = withTranslation()(Sidebar);
        render(<SidebarWithTranslation />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });
});
