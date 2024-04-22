import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sidebar } from './Sidebar';
import { componentRender } from '../../../../shared/lib/tests/componentRender/componentRender';

describe('Sidebar', () => {
    test('test render Sidebar component', () => {
        componentRender(<Sidebar />);
        console.log(screen.debug(null, Infinity));
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('test toggle Sidebar', () => {
        componentRender(<Sidebar />);
        console.log(screen.debug(null, Infinity));
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
