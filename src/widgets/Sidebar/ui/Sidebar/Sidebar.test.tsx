import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Sidebar } from './Sidebar';
import { renderWithTranslation } from '../../../../shared/lib/tests/renderWithTranslation/renderWithTranslation';

describe('Sidebar', () => {
    test('test render Sidebar component', () => {
        renderWithTranslation(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });
});
