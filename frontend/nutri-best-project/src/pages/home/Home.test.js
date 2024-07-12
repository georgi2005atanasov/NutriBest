import Home from "./Home.jsx";
import { render } from '@testing-library/react';

/* eslint-env jest */
test('renders Home with HomeHeader in the document', () => {
    const { container } = render(<Home />);
    const headerElement = container.querySelector(".header");
    expect(headerElement).toBeInTheDocument();
});
