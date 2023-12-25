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
        fireEvent.click(screen.getByRole('button',{title:'Search button'}));
        expect(doSearch).toHaveBeenCalledTimes(1);
    });
});
