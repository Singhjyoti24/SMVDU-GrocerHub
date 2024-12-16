import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    feedbackResponse: null,
    isLoading: false,
};

export const submitFeedback = createAsyncThunk(
    "feedback/submitFeedback",
    async ({ userId, suggestion, reason }) => {
        const response = await axios.post(
            "http://localhost:5000/api/shop/feedback/submit",
            {
                userId, suggestion, reason
            }
        );

        console.log(response);
        return response.data;
    }
);


const shoppingFeedbackSlice = createSlice({
    name: "shoppingFeedback",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitFeedback.pending, (state) => {
                state.isLoading = true;
                state.feedbackResponse = null;
            })
            .addCase(submitFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedbackResponse = action.payload; // Server response
            })
            .addCase(submitFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.feedbackResponse = null;
            });
    },
});

export default shoppingFeedbackSlice.reducer;