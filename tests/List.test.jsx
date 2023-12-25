import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from "vitest";
import List from '../src/List';
const data = [
    {
        partOfSpeech: 'noun',
        definition: { definition: 'An attempt to find something.' }
    },
    {
        partOfSpeech: 'verb',
        definition: { definition: 'To look in (a place) for something.' }
    }
];
describe('List component tests', () => {
    it('Test the table', () => {
        render(<List data={data}  />);
        expect(screen.getByTitle('Response')).toBeInTheDocument();
    });
    it('Test the index', () => {
        render(<List data={data}  />);
        expect(screen.getByText('#')).toBeInTheDocument();
    });
    it('Test the type', () => {
        render(<List data={data}  />);
        expect(screen.getByText('Type')).toBeInTheDocument();
    });
    it('Test the definition', () => {
        render(<List data={data}  />);
        expect(screen.getByText('Definition')).toBeInTheDocument();
    });

});
