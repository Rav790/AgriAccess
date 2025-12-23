import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const initialState = {
  regions: [],
  states: [],
  landHoldings: [],
  irrigationSources: [],
  croppingPatterns: [],
  wellDepths: [],
  statistics: null,
  filters: {
    state: '',
    district: '',
    year: 2023,
    crop: '',
    season: '',
  },
  loading: false,
  error: null,
  pagination: {
    total: 0,
    limit: 100,
    offset: 0,
  },
};

// Helper function to get auth header
const getAuthHeader = (getState) => {
  const token = getState().auth.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Async thunks
export const fetchRegions = createAsyncThunk(
  'data/fetchRegions',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/data/regions`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch regions');
    }
  }
);

export const fetchLandHoldings = createAsyncThunk(
  'data/fetchLandHoldings',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/data/landholdings`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch land holdings');
    }
  }
);

export const fetchIrrigationSources = createAsyncThunk(
  'data/fetchIrrigationSources',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/data/irrigation`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch irrigation data');
    }
  }
);

export const fetchCroppingPatterns = createAsyncThunk(
  'data/fetchCroppingPatterns',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/data/cropping`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cropping patterns');
    }
  }
);

export const fetchWellDepths = createAsyncThunk(
  'data/fetchWellDepths',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/data/wells`, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch well depths');
    }
  }
);

export const fetchStatistics = createAsyncThunk(
  'data/fetchStatistics',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/data/stats`, { params });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch statistics');
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Regions
      .addCase(fetchRegions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegions.fulfilled, (state, action) => {
        state.loading = false;
        state.regions = action.payload.data;
        state.states = action.payload.states || [];
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Land Holdings
      .addCase(fetchLandHoldings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLandHoldings.fulfilled, (state, action) => {
        state.loading = false;
        state.landHoldings = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchLandHoldings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Irrigation Sources
      .addCase(fetchIrrigationSources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIrrigationSources.fulfilled, (state, action) => {
        state.loading = false;
        state.irrigationSources = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchIrrigationSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Cropping Patterns
      .addCase(fetchCroppingPatterns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCroppingPatterns.fulfilled, (state, action) => {
        state.loading = false;
        state.croppingPatterns = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCroppingPatterns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Well Depths
      .addCase(fetchWellDepths.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWellDepths.fulfilled, (state, action) => {
        state.loading = false;
        state.wellDepths = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchWellDepths.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Statistics
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, resetFilters, clearError } = dataSlice.actions;
export default dataSlice.reducer;
