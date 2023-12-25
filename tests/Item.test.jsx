import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from "vitest";
import Item from '../src/Item';
const item = {
    partOfSpeech: 'noun',
    definition: { definition: 'An attempt to find something.' }
};
const index = 0;
describe('Header components tests', () => {
    it('Test the index', () => {
        render(<Item item={item} index={index} />);
        expect(screen.getByText(index + 1)).toBeInTheDocument();
    });
    it('Test the part of speech', () => {
        render(<Item item={item} index={index} />);
        expect(screen.getByText(item.partOfSpeech)).toBeInTheDocument();
    });
    it('Test the definition', () => {
        render(<Item item={item} index={index} />);
        expect(screen.getByText(item.definition.definition)).toBeInTheDocument();
    });
});
