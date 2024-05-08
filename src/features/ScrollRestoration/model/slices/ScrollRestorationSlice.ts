import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollRestorationSchema } from '../types/ScrollRestorationSchema';

const initialState: ScrollRestorationSchema = {
    scroll: {},
};

// {path: string, position: number} = {{path: 'page', position: 500}}

export const uiSlice = createSlice({
    name: 'scrollRestoration',
    initialState,
    reducers: {
        setScrollPosition: (state, action: PayloadAction<{path: string, position: number}>) => {
            state.scroll[action.payload.path] = action.payload.position;
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: scrollRestorationActions } = uiSlice;
export const { reducer: scrollRestorationReducer } = uiSlice;
