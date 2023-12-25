import { describe, it, expect } from "vitest";
import { reducer, ACTIONS } from "../src/App";
//import { reducer, ACTIONS } from "../src/App.jsx";
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
    it(`Test Default`, () => {
        const state = { isLoading: false, error: false, data: null };
        const action = { type: '' };
        const expectedState = { isLoading: false, error: false, data: null };
        const newState = reducer(state, action);
        expect(newState).toStrictEqual(expectedState);
    });
});