import { act, render, screen } from '@testing-library/react';
import App from './App';

document.createRange = () => {
    const range = new Range();

    range.getBoundingClientRect = jest.fn();

    range.getClientRects = jest.fn(() => ({
        item: () => null,
        length: 0,
    }));

    return range;
};

const homeLinkClick = (name) => 
    test(name, 
        () => {
            render(<App />);
            const link = document.querySelector('#home-link');
            act(() => {
                link.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });
            const btn = screen.getByText(/Start Coding/i);
            expect(btn).toBeInTheDocument();
        }
    );

test('renders Start Coding Button (Home Page)', 
() => {
    render(<App />);
    const btn = screen.getByText(/Start Coding/i);
    expect(btn).toBeInTheDocument();
});

homeLinkClick('Clicking "Home" link does nothing at first');


test('Changes Page on Button Click', 
() => {
    render(<App />);
    const btn = document.querySelector('#code-btn');
    act(() => {
        btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(btn).not.toBeInTheDocument(); 
    expect(document.querySelector('#home-link')).toBeInTheDocument();
    expect(document.querySelector('#Editor')).toBeInTheDocument();
    expect(screen.getByText(/Language/i)).toBeInTheDocument();
});


homeLinkClick('Changes Page by Clicking on Home Link');