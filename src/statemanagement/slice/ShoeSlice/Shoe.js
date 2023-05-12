import { createSlice } from "@reduxjs/toolkit";
import { initialState, getAllShoe, getShoeById, getShoeByIdOnPageLoad, getTopShoe } from "./index";

const shoeSlice = createSlice({
    name: "Shoe",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllShoe.pending]: (state) => {
            state.loading = true;
        }
        , [getAllShoe.fulfilled]: (state, action) => {
            state.loading = false;
            state.shoeData = action.payload.data;
            state.runningData = action.payload.runnning;
            state.loungingData = action.payload.lounging;
            state.everydayData = action.payload.everyday;
        }
        , [getAllShoe.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        }
        , [getTopShoe.pending]: (state) => {
            state.loading = true;
        }
        , [getTopShoe.fulfilled]: (state, action) => {
            state.loading = false;
            state.topShoeData = action.payload;
        }
        , [getTopShoe.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        }
        , [getShoeByIdOnPageLoad.pending]: (state) => {
            state.loading = true;
        }
        , [getShoeByIdOnPageLoad.fulfilled]: (state, action) => {
            state.loading = false;
            state.singleShoeData = action.payload;
        }
        , [getShoeByIdOnPageLoad.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
        , [getShoeById.pending]: (state) => {
            state.loading = true;
        }
        , [getShoeById.fulfilled]: (state, action) => {
            state.loading = false;
            state.singleShoeData = state.shoeData.filter((item) => item._id === action.payload)[0];
        }
        , [getShoeById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const shoeReducer = shoeSlice.reducer;

