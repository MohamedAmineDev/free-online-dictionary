import { describe, it, expect, vi } from "vitest";
import { reducer, ACTIONS, App } from "../src/App";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from "axios";
describe("Reducer function tests", () => {
    it(`Test ${ACTIONS.START_FETCHING_DATA}`, () => {
        const state = { isLoading: false, error: false, data: null };
        const action = { type: ACTIONS.START_FETCHING_DATA };
        const expectedState = { isLoading: true, error: false, data: null };
        const newState = reducer(state, action);
        expect(newState).toStrictEqual(expectedState);
    });
    it(`Test ${ACTIONS.START_FETCHING_DATA}`, () => {
        const state = { isLoading: false, error: false, data: null };
        const action = { type: ACTIONS.DATA_FETCHED, payload: {} };
        const expectedState = { isLoading: false, error: false, data: {} };
        const newState = reducer(state, action);
        expect(newState).toStrictEqual(expectedState);
    });
    it(`Test ${ACTIONS.DATA_NOT_FETCHED}`, () => {
        const state = { isLoading: false, error: false, data: null };
        const action = { type: ACTIONS.DATA_NOT_FETCHED };
        const expectedState = { isLoading: false, error: true, data: null };
        const newState = reducer(state, action);
        expect(newState).toStrictEqual(expectedState);
    });
    it(`Test ${ACTIONS.DATA_DELETE_ITEM}`, () => {
        const data = [{ partOfSpeech: 'noun', definition: { definition: 'The word "hi" used as a greeting.' } }]
        const state = { isLoading: false, error: false, data: data };
        const action = { type: ACTIONS.DATA_DELETE_ITEM, index: 0 };
        const expectedState = { isLoading: false, error: false, data: [] };
        const newState = reducer(state, action);
        expect(newState).toStrictEqual(expectedState);
    });
    it(`Test ${ACTIONS.DATA_SORT_ITEMS}`, () => {
        const data = [
            { partOfSpeech: 'noun', definition: { definition: '(diminutive) An even number.' } },
            { partOfSpeech: 'verb', definition: { definition: 'To make flat and level.' } },
            { partOfSpeech: 'adjective', definition: { definition: '	Flat and level.' } }
        ];
        const sortedData = [
            { partOfSpeech: 'adjective', definition: { definition: '	Flat and level.' } },
            { partOfSpeech: 'noun', definition: { definition: '(diminutive) An even number.' } },
            { partOfSpeech: 'verb', definition: { definition: 'To make flat and level.' } }
        ];
        const state = { isLoading: false, error: false, data: data };
        const action = { type: ACTIONS.DATA_SORT_ITEMS };
        const expectedState = { isLoading: false, error: false, data: sortedData };
        const newState = reducer(state, action);
        expect(newState).toStrictEqual(expectedState);
    });
    it(`Test Default`, () => {
        const state = { isLoading: false, error: false, data: null };
        const action = { type: '' };
        const expectedState = { isLoading: false, error: false, data: null };
        const newState = reducer(state, action);
        expect(newState).toStrictEqual(expectedState);
    });
});
// Integration tests
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
const response = {
    data: [{ word: 'Search', phonetics: [], meanings: data }],
    status: 200,
    statusText: ''
}
vi.mock('axios');
describe('App component integration tests', () => {
    it('Happy path', async () => {
        const promise = Promise.resolve(response);
        //console.log(promise);
        axios.get.mockImplementationOnce(() => promise);
        render(< App />);
        expect(screen.queryByText(/Is/)).toBeInTheDocument();
        await waitFor(async () => await promise);
        expect(screen.queryByText(/Is/)).toBeNull();
        expect(screen.queryByText(/Meanings/)).toBeInTheDocument();
        //screen.debug();
    });
    it('Unhappy path', async () => {
        const promise = Promise.reject();
        //console.log(promise);
        axios.get.mockImplementationOnce(() => promise);
        render(< App />);
        expect(screen.queryByText(/Is/)).toBeInTheDocument();
        try {
            await waitFor(async () => await promise);
        }
        catch (exception) {
            expect(screen.queryByText(/Is/)).toBeNull();
            expect(screen.queryByText(/No/)).toBeInTheDocument();
        }
        //screen.debug();
    });
});