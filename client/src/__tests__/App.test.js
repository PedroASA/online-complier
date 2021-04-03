/*
    Unitary tests to the App Component.
    Note: Test are not cleaned up after executed.
*/

import { act, render, screen } from '@testing-library/react';
import App from '../App';

// Avoid some bug with jest and create-react-app or codeMirror.
document.createRange = () => {
    const range = new Range();

    range.getBoundingClientRect = jest.fn();

    range.getClientRects = jest.fn(() => ({
        item: () => null,
        length: 0,
    }));

    return range;
};

/* 
    A function that returns a test to simulate a click in the Home Link 
    on the navbar and assert it remains in the document.
*/
const homeLinkClick = (name) => 
    // eslint-disable-next-line jest/valid-title
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

// Assert the page rendered contains the 'start coding' button.
test('renders Start Coding Button (Home Page)', 
() => {
    render(<App />);
    const btn = screen.getByText(/Start Coding/i);
    expect(btn).toBeInTheDocument();
});

homeLinkClick('Clicking "Home" link does nothing at first');

// Assert Editor loads by clicking in the 'start coding' button.
test('Changes Page on Button Click', 
() => {
    render(<App />);
    const btn = document.querySelector('#code-btn');
    act(() => {
        btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(document.querySelector('#home-link')).toBeInTheDocument();
    expect(document.querySelector('#Editor')).toBeInTheDocument();
});


homeLinkClick('Changes Page by Clicking on Home Link');