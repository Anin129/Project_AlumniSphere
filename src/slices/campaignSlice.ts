import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch data from API
export const fetchCampaigns = createAsyncThunk("campaigns/fetch", async () => {
  const res = await fetch("/api/campaigns");
  if (!res.ok) throw new Error("Failed to fetch campaigns");
  return await res.json();
});

const campaignSlice = createSlice({
  name: "campaigns",
  initialState: {
    items: [],
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error fetching campaigns";
      });
  },
});

export default campaignSlice.reducer;
