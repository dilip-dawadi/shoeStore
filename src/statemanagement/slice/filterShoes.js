import { createSlice } from '@reduxjs/toolkit';
import { NotifyError, NotifyWarning } from '../../toastify';
import * as api from '../api/ShoeApi';

const Status = Object.freeze({
    IDLE: 'idle',
    LOADING: 'loading',
    FAILED: 'failed'
});

const initialState = {
    page: 1,
    limit: 8,
    sort: 'createdAt',
    brand: '',
    category: '',
    price: '',
    brandData: [],
    categoryData: [],
    pageData: [],
    status: Status.IDLE,
}

export const getAllFilterData = () => async (dispatch, getState) => {
    dispatch(setStatus(Status.LOADING));
    try {
        const { data: { data } } = await api.GetFilterData();
        dispatch(setBrandData(data?.brand));
        dispatch(setCategoryData(data?.category));
        dispatch(setPageData(data?.pageNumbers));
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

export const filterShoes = createSlice({
    name: 'filterShoes',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setBrandValue: (state, action) => {
            state.brand = action.payload;
        },
        setCategoryValue: (state, action) => {
            state.category = action.payload;
        },
        setPriceValue: (state, action) => {
            state.price = action.payload;
        },
        setPageValue: (state, action) => {
            state.page = action.payload;
        },
        setBrandData: (state, action) => {
            state.brandData = ['All Brands', ...action.payload];
        },
        setCategoryData: (state, action) => {
            state.categoryData = ['All Categories', ...action.payload];
        },
        setPageData: (state, action) => {
            state.pageData = ["All Pages", ...action.payload];
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { setPage, setLimit, setSort, setBrandValue, setCategoryValue, setPriceValue, setBrandData, setCategoryData, setPageData, setPageValue, setStatus } = filterShoes.actions;
export const filterReducer = filterShoes.reducer;