import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect,vi } from "vitest";
import { Search } from "../src/Search";
describe('Search component tests',()=>{
    it('Test the parameter word',()=>{
        const word="Hi";
        const isLoading=false;
        const doSearch=vi.fn();
        render(<Search word={word} isLoading={isLoading} doSearch={doSearch} />);
        expect(screen.getByDisplayValue(word)).toBeInTheDocument();
    });
    it('Test the search button',()=>{
        const word="Hi";
        const isLoading=false;
        const doSearch=vi.fn();
        render(<Search word={word} isLoading={isLoading} doSearch={doSearch} />);
        fireEvent.click(screen.getByTitle('Search button'));
        expect(doSearch).toHaveBeenCalledTimes(1);
    });
    it('Test the last search button',()=>{
        const word="Hi";
        const isLoading=false;
        const doLastSearch=vi.fn();
        render(<Search word={word} isLoading={isLoading} doLastSearch={doLastSearch} />);
        fireEvent.click(screen.getByTitle('Last search button'));
        expect(doLastSearch).toHaveBeenCalledTimes(1);
    });
});
