import { createSlice } from "@reduxjs/toolkit";
import { decodeToken } from "react-jwt";
import { NotifyError, NotifySuccess, NotifyWarning } from "../../../toastify";
import * as api from '../../api/cartApi';

const Status = Object.freeze({
    IDLE: 'idle',
    LOADING: 'loading',
    FAILED: 'failed',
    Increment: 'increment',
});

export const initialState = {
    cartIds: localStorage.getItem('authenticate') ? decodeToken(localStorage.getItem('authenticate')).cart ? decodeToken(localStorage.getItem('authenticate')).cart : [] : [],
    cartData: [],
    status: Status.IDLE,
    isOpenCart: false,
}

export const getCarts = () => async (dispatch) => {
    dispatch(setStatus(Status.LOADING));
    try {
        const { data: { data, token } } = await api.GetAllCartAPI();
        dispatch(getAllCartData(data));
        localStorage.setItem('authenticate', token)
        dispatch(setStatus(Status.IDLE));
    } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyWarning(error.response.data.message)
        } else {
            NotifyError(error.message)
        }
    }
}

export const addCarts = ({ product, shoeId, notification }) => async (dispatch) => {
    dispatch(setStatus(Status.LOADING));
    try {
        const { data: { data, token, message } } = await api.AddCartAPI(shoeId);
        localStorage.setItem('authenticate', token)
        dispatch(addCartData(product));
        dispatch(addCartIds(data));
        dispatch(isOpenCart(true));
        if (notification !== false) {
            NotifySuccess(message);
        }
        dispatch(setStatus(Status.IDLE));
    } catch (error) {
        if (error?.response?.status >= 400 && error?.response?.status <= 500) {
            if (notification !== false) {
                NotifyWarning(error?.response?.data?.message || 'Something went wrong')
            }
            return dispatch(setStatus(Status.FAILED));
        } else {
            NotifyError(error?.message)
            return dispatch(setStatus(Status.FAILED));
        }
    }
}

export const CartisOpen = (open) => async (dispatch) => {
    dispatch(isOpenCart(open));
}

export const deleteCarts = (id) => async (dispatch) => {
    dispatch(setStatus(Status.LOADING));
    try {
        const { data: { message, data, token } } = await api.DeleteCartAPI(id);
        localStorage.setItem('authenticate', token)
        dispatch(deleteCartData(id));
        dispatch(addCartIds(data));
        NotifySuccess(message);
        dispatch(setStatus(Status.IDLE));
    } catch (error) {
        if (error?.response?.status >= 400 && error?.response?.status <= 500) {
            NotifyWarning(error?.response?.data?.message || 'Something went wrong')
            return dispatch(setStatus(Status.FAILED));
        } else {
            NotifyError(error?.message)
            return dispatch(setStatus(Status.FAILED));
        }
    }
}

export const cartQuantity = ({ status, shoeId }) => async (dispatch) => {
    dispatch(setStatus(Status.Increment));
    try {
        const { data: { message, token, data } } = await api.CartQuantityAPI(shoeId, status);
        dispatch(addCartIds(data));
        localStorage.setItem('authenticate', token)
        NotifySuccess(message);
        dispatch(setStatus(Status.IDLE));
    } catch (error) {
        if (error?.response?.status >= 400 && error?.response?.status <= 500) {
            NotifyWarning(error?.response?.data?.message || 'Something went wrong')
            return dispatch(setStatus(Status.FAILED));
        } else {
            NotifyError(error?.message)
            return dispatch(setStatus(Status.FAILED));
        }
    }
}

export const checkoutAct = (total) => async (dispatch) => {
    dispatch(setStatus(Status.LOADING));
    try {
        const { data: { message, token } } = await api.checkoutAPI(total);
        localStorage.setItem('authenticate', token)
        const decodeData = decodeToken(token);
        dispatch(checkoutCart());
        console.log(decodeData)
        NotifySuccess(message);
        dispatch(setStatus(Status.IDLE));
    } catch (error) {
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
        getAllCartData: (state, action) => {
            state.cartData = action.payload;
        },
        addCartData: (state, action) => {
            state.cartData = [...state.cartData, action.payload];
        },
        addCartIds: (state, action) => {
            state.cartIds = action.payload
        },
        deleteCartData: (state, action) => {
            state.cartData = state.cartData.filter((item) => item._id !== action.payload);
        },
        checkoutCart: (state) => {
            state.cartData = [];
            state.cartIds = [];
        },
        isOpenCart: (state, action) => {
            state.isOpenCart = action.payload;
        },
    },
});

export const { setStatus, addCartData, addCartIds, getAllCartData, deleteCartData, checkoutCart, isOpenCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;