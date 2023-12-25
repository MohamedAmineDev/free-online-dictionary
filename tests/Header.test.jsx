import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from "vitest";
import { Header } from "../src/Header";
describe('Header compnents tests',()=>{
    it('Test the title',()=>{
        render(<Header />);
        expect(screen.getByText('Free online dictionary')).toBeInTheDocument();
    });
});
