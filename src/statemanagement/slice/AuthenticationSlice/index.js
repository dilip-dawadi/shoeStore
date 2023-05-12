import * as api from "../../api/AuthenticationApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { NotifyError, NotifySuccess, NotifyWarning } from "../../../toastify";

export const registeraUser = createAsyncThunk(
  "User/registeraUser",
  async (
    { authData, navigate, closeModal, closeModalDropDown },
    { rejectWithValue }
  ) => {
    try {
      const {
        data: { message },
      } = await api.registeraUser(authData);
      closeModal();
      window.innerWidth < 768 && closeModalDropDown();
      NotifySuccess(message);
      navigate("/");
      return;
    } catch (error) {
      if (error?.response?.status >= 300 && error?.response?.status <= 500) {
        NotifyWarning(
          error?.response?.data?.message || "Error please  reload page"
        );
        return rejectWithValue(
          error?.response?.data?.message || "Error please  reload page"
        );
      } else {
        NotifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginaUser = createAsyncThunk(
  "User/loginaUser",
  async (
    { authData, navigate, closeModal, closeModalDropDown },
    { rejectWithValue }
  ) => {
    try {
      const {
        data: { message },
      } = await api.loginaUser(authData);
      closeModal();
      window.innerWidth < 768 && closeModalDropDown();
      NotifySuccess(message);
      navigate("/");
      return;
    } catch (error) {
      if (error?.response?.status >= 300 && error?.response?.status <= 500) {
        NotifyWarning(
          error?.response?.data?.message || "Error please  reload page"
        );
        return rejectWithValue(
          error?.response?.data?.message || "Error please  reload page"
        );
      } else {
        NotifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const VerifyaUser = createAsyncThunk(
  "User/VerifyUser",
  async ({ params, navigate, setMessage }, { rejectWithValue }) => {
    try {
      const {
        data: { message },
      } = await api.verifyUser(params);
      setMessage(message);
      NotifySuccess(message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return;
    } catch (error) {
      if (error?.response?.status >= 300 && error?.response?.status <= 500) {
        setMessage(
          error?.response?.data?.message || "Error please  reload page"
        );
        NotifyWarning(
          error?.response?.data?.message || "Error please  reload page"
        );
        return rejectWithValue(
          error?.response?.data?.message || "Error please  reload page"
        );
      } else {
        setMessage(error.message);
        NotifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "User/logoutUser",
  async ({ navigate }) => {
    try {
      const {
        data: { message },
      } = await api.logoutUser();
      NotifySuccess(message);
      navigate("/");
      return;
    } catch (error) {
      console.log(error);
    }
  }
);
