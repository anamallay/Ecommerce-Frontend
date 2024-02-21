import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const sendContactForm = createAsyncThunk(
  "contact/sendContactForm",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/contactus",
        contactData
      );
      return response.data;
    } catch (error) {
      // Check if the server responded with a non-200 status and use that message if available
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      } else {
        // This handles cases where the error is not coming from the server response
        return rejectWithValue(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // Optionally add reducer functions if you need to handle additional actions
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactForm.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset success state on new submission
        state.isError = false; // Reset error state on new submission
        state.message = ""; // Clear previous messages
      })
      .addCase(sendContactForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(sendContactForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // Ensure action.payload is used safely
        state.message = action.payload
          ? action.payload
          : "An unexpected error occurred.";
      });
  },
});

// Export the reducer and reset action
export const { reset } = contactSlice.actions;
export default contactSlice.reducer;
