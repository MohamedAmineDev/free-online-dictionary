import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from "vitest";
import { Footer } from "../src/Footer";
describe('Header compnents tests', () => {
    it('Test the text', () => {
        render(<Footer />);
        expect(screen.getByText(/Created with love/)).toBeInTheDocument();
    });
    it('Test the heart', () => {
        render(<Footer />);
        expect(screen.getByTitle('heart')).toBeInTheDocument();
    });
});
