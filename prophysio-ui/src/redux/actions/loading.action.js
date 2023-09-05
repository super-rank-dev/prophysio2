import { PAGE_LOADING, PAGE_LOADED } from '../types';

// Set Page Loading
export const setPageLoading = () => dispatch => {
    dispatch({ type: PAGE_LOADING });
};

// Set Page Loaded
export const setPageLoaded = () => dispatch => {
    dispatch({ type: PAGE_LOADED });
};