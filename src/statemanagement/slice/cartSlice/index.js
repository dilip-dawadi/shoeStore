import { createSlice } from "@reduxjs/toolkit";
import { decodeToken } from "react-jwt";
import { NotifyError, NotifyWarning } from "../../../toastify";

const Status = Object.freeze({
    IDLE: 'idle',
    LOADING: 'loading',
    FAILED: 'failed'
});
export const initialState = {
    cartIds: localStorage.getItem('authenticate') ? decodeToken(localStorage.getItem('authenticate')).cart ? decodeToken(localStorage.getItem('authenticate')).cart : [] : [],
    cartData: [],
    status: Status.IDLE,
}

export const addCarts = ({ product, shoeId }) => async (dispatch, getState) => {
    dispatch(setStatus(Status.LOADING));
    try {
        dispatch(setCartData(product));
        dispatch(setCartIds(shoeId));
        dispatch(setStatus(Status.IDLE));
    } catch (error) {
        console.log(error, 'error')
        if (error?.response?.status >= 400 && error?.response?.status <= 500) {
            NotifyWarning(error?.response?.data?.message || 'Something went wrong')
            return dispatch(setStatus(Status.FAILED));
        } else {
            NotifyError(error?.message)
            return dispatch(setStatus(Status.FAILED));
        }
    }
}

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setCartData: (state, action) => {
            state.cartData = [...state.cartData, action.payload];
        },
        setCartIds: (state, action) => {
            state.cartIds = [...state.cartIds, action.payload];
        },
    },
});

export const { setStatus, setCartData, setCartIds } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;