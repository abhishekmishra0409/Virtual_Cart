import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contactService } from "./ContactService.js";
import { toast } from "react-toastify";

// Async thunk for sending contact message
export const sendContact = createAsyncThunk(
    "contact/send",
    async (contactData, thunkApi) => {
        try {
            return await contactService.sendContactMessage(contactData);
        } catch (e) {
            return thunkApi.rejectWithValue(e.response?.data || e.message);
        }
    }
);

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        resetState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },},
    extraReducers: (builder) => {
        builder
            // Send contact message
            .addCase(sendContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.payload.message || "Message sent successfully!";
                toast.success(state.message);
            })
            .addCase(sendContact.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to send message.";
                toast.error(state.message);
            });
    },
});

export const { resetState } = contactSlice.actions;

export default contactSlice.reducer;
