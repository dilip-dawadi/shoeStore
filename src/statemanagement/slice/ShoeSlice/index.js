import * as api from '../../api/ShoeApi';
import { createAsyncThunk } from '@reduxjs/toolkit'
import { NotifyError, NotifySuccess, NotifyWarning } from '../../../toastify';
export const initialState = {
    error: null,
    shoeData: [],
    loungingData: [],
    everydayData: [],
    runningData: [],
    singleShoeData: '',
    topShoeData: [],
    loading: false
}
export const getAllShoe = createAsyncThunk('Shoe/getAllShoe', async ({ page, limit, sort, brand, category, price }, { rejectWithValue }) => {
    try {
        const { data: { data, runnning, lounging, everyday } } = await api.GetAllShoeAPI({ page, limit, sort, brand, category, price });
        return { data, runnning, lounging, everyday };
    } catch (error) {
        if (error?.response?.status >= 400 && error?.response?.status <= 500) {
            NotifyWarning(error?.response?.data?.message || "Error please  reload page")
            return rejectWithValue(error?.response?.data?.message || "Error please  reload page");
        } else {
            NotifyError(error.message)
            return rejectWithValue(error.message)
        }
    }
}
);

export const getTopShoe = createAsyncThunk('Shoe/getTopShoe', async (rejectWithValue) => {
    try {
        const { data: { data } } = await api.GetTopShoeAPI();
        return data;
    } catch (error) {
        if (error?.response?.status >= 400 && error?.response?.status <= 500) {
            NotifyWarning(error?.response?.data?.message || "Error please  reload page")
            return rejectWithValue(error?.response?.data?.message || "Error please  reload page");
        } else {
            NotifyError(error.message)
            return rejectWithValue(error.message)
        }
    }
}
);

export const getShoeById = createAsyncThunk('Shoe/getShoeById', async (shoeId) => {
    return shoeId;
});
export const getShoeByIdOnPageLoad = createAsyncThunk('Shoe/getShoeByIdOnPageLoad', async (shoeId, { rejectWithValue }) => {
    try {
        const { data: { data, message } } = await api.GetShoeByIdAPI(shoeId);
        NotifySuccess(message);
        return data;
    } catch (error) {
        if (error?.response?.status >= 400 && error?.response?.status <= 500) {
            NotifyWarning(error?.response?.data?.message || "Error please  reload page")
            return rejectWithValue(error?.response?.data?.message || "Error please  reload page");
        } else {
            NotifyError(error.message)
            return rejectWithValue(error.message)
        }
    }
}
);

export const createShoe = createAsyncThunk('Shoe/createShoe', async ({ closeModal
    , AddProductData }, { rejectWithValue }) => {
    try {
        const { data: { message } } = await api.CreateShoeAPI(AddProductData);
        closeModal();
        NotifySuccess(message);
        return;
    } catch (error) {
        if (error?.response?.status >= 400 && error?.response?.status <= 500) {
            NotifyWarning(error?.response?.data?.message || "Error please  reload page")
            return rejectWithValue(error?.response?.data?.message || "Error please  reload page");
        } else {
            NotifyError(error.message)
            return rejectWithValue(error.message)
        }
    }
}
);
