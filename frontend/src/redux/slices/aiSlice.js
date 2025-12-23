import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const initialState = {
  summary: null,
  predictions: null,
  chatHistory: [],
  reportData: null,
  loading: false,
  error: null,
};

// Helper function to get auth header
const getAuthHeader = (getState) => {
  const token = getState().auth.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Async thunks
export const generateSummary = createAsyncThunk(
  'ai/generateSummary',
  async (data, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/ai/summary`,
        data,
        { headers: getAuthHeader(getState) }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate summary');
    }
  }
);

export const generatePrediction = createAsyncThunk(
  'ai/generatePrediction',
  async (data, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/ai/predict`,
        data,
        { headers: getAuthHeader(getState) }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate prediction');
    }
  }
);

export const sendChatMessage = createAsyncThunk(
  'ai/sendChatMessage',
  async (message, { getState, rejectWithValue }) => {
    try {
      const { chatHistory } = getState().ai;
      const response = await axios.post(
        `${API_URL}/ai/chat`,
        {
          message: message.content,
          context: message.context,
          conversationHistory: chatHistory,
        },
        { headers: getAuthHeader(getState) }
      );
      return {
        userMessage: message,
        aiResponse: response.data.data,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

export const generateReport = createAsyncThunk(
  'ai/generateReport',
  async (data, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/ai/report`,
        data,
        { headers: getAuthHeader(getState) }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate report');
    }
  }
);

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    clearChatHistory: (state) => {
      state.chatHistory = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    addUserMessage: (state, action) => {
      state.chatHistory.push({
        role: 'user',
        content: action.payload,
        timestamp: new Date().toISOString(),
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate Summary
      .addCase(generateSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(generateSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Generate Prediction
      .addCase(generatePrediction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePrediction.fulfilled, (state, action) => {
        state.loading = false;
        state.predictions = action.payload;
      })
      .addCase(generatePrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send Chat Message
      .addCase(sendChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        // Only add AI response, user message was already added
        state.chatHistory.push({
          role: 'assistant',
          content: action.payload.aiResponse.reply,
          timestamp: action.payload.aiResponse.timestamp,
        });
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Generate Report
      .addCase(generateReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reportData = action.payload;
      })
      .addCase(generateReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearChatHistory, clearError, addUserMessage } = aiSlice.actions;
export default aiSlice.reducer;
