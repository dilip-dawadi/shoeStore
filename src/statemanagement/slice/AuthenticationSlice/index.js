import * as api from '../../api/AuthenticationApi';
import { createAsyncThunk } from '@reduxjs/toolkit'
import { NotifyError, NotifySuccess, NotifyWarning } from '../../../toastify';
export const initialState = {
    loading: false,
    currentPage: 1,
    totalPages: 1,
    error: ''
}

export const registeraUser = createAsyncThunk('User/registeraUser', async ({ authData, navigate, closeModal, closeModalDropDown }, { rejectWithValue }) => {
    try {
        const { data: { message } } = await api.registeraUser(authData);
        closeModal();
        window.innerWidth < 768 && closeModalDropDown();
        NotifySuccess(message);
        navigate("/");
        return;
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

export const loginaUser = createAsyncThunk('User/loginaUser', async ({ authData, navigate, closeModal, closeModalDropDown }, { rejectWithValue }) => {
    try {
        const { data: { message, data, token } } = await api.loginaUser(authData);
        closeModal();
        window.innerWidth < 768 && closeModalDropDown();
        localStorage.setItem('token', token)
        localStorage.setItem('userData', JSON.stringify(data))
        NotifySuccess(message);
        navigate("/");
        return;
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
export const logoutUser = createAsyncThunk('User/logoutUser', async () => {
    NotifySuccess('user logged out successfully');
    localStorage.clear();
    return;
})
