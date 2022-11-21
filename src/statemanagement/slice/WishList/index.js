import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { NotifyError, NotifySuccess, NotifyWarning } from "../../../toastify";
import * as api from '../../api/WishListApi';
import { decodeToken } from "react-jwt";
export const initialState = {
    error: null,
    wishListIDs: localStorage.getItem('authenticate') ? decodeToken(localStorage.getItem('authenticate')).wishlist ? decodeToken(localStorage.getItem('authenticate')).wishlist : [] : [],
    wishListData: [],
    loading: false
}

export const getAllWishList = createAsyncThunk('WishList/getAllWishList', async (rejectWithValue) => {
    console.log('getAllWishList')
    try {
        const { data: { data, token } } = await api.GetAllWishListAPI();
        localStorage.setItem('authenticate', token)
        return data;
    } catch (error) {
        console.log(error, 'error')
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyWarning(error.response.data.message)
            return rejectWithValue(error.response.data.message);
        } else {
            NotifyError(error.message)
            return rejectWithValue(error.message)
        }
    }
}
);

export const addWishList = createAsyncThunk('WishList/addWishList', async ({ shoeId, product }, { rejectWithValue }) => {
    try {
        const { data: { message, data, token } } = await api.AddWishListAPI(shoeId);
        localStorage.setItem('authenticate', token)
        NotifySuccess(message);
        return { data, product };
    } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyWarning(error.response.data.message)
            return rejectWithValue(error.response.data.message);
        } else {
            NotifyError(error.message)
            return rejectWithValue(error.message)
        }
    }
}
);

export const deleteWishList = createAsyncThunk('WishList/deleteWishList', async (shoeId, { rejectWithValue }) => {
    try {
        const { data: { message, data, token } } = await api.DeleteWishListAPI(shoeId);
        localStorage.setItem('authenticate', token)
        NotifyWarning(message);
        return { data, shoeId };
    } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
            NotifyWarning(error.response.data.message)
            return rejectWithValue(error.response.data.message);
        } else {
            NotifyError(error.message)
            return rejectWithValue(error.message)
        }
    }
}
);

const wishListSlice = createSlice({
    name: "WishList",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllWishList.pending]: (state) => {
            state.loading = true
        },
        [getAllWishList.fulfilled]: (state, action) => {
            state.loading = false
            state.wishListData = action.payload
        },
        [getAllWishList.rejected]: (state, action) => {
            state.loading = false
            state.error = true
        },
        [addWishList.pending]: (state) => {
            state.loading = true
        },
        [addWishList.fulfilled]: (state, action) => {
            state.loading = false
            state.wishListIDs = action.payload.data
            state.wishListData = [...state.wishListData, action.payload.product]
        },
        [addWishList.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [deleteWishList.pending]: (state) => {
            state.loading = true
        },
        [deleteWishList.fulfilled]: (state, action) => {
            state.loading = false
            state.wishListIDs = action.payload.data
            state.wishListData = state.wishListData.filter((item) => item._id !== action.payload.shoeId)
        },
        [deleteWishList.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
});

export const wishListReducer = wishListSlice.reducer;