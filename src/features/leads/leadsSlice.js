// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/axiosClient";

// export const fetchLeads = createAsyncThunk("leads/fetch", async () => {
//   const res = await api.get("/leads");
//   return res.data.data;
// });

// const leadsSlice = createSlice({
//   name: "leads",
//   initialState: {
//     list: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLeads.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchLeads.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload;
//       })
//       .addCase(fetchLeads.rejected, (state) => {
//         state.loading = false;
//         state.error = "Failed to fetch leads";
//       });
//   },
// });

// export default leadsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// TEMP MOCK DATA — REMOVE WHEN BACKEND READY
// const MOCK_LEADS = [
//   {
//     _id: "1",
//     name: "John Doe",
//     company: "ABC Pvt Ltd",
//     email: "john@example.com",
//     phone: "9876543210",
//     status: "New",
//     profile_share: false,
//     form_responses: [
//       { question: "What is your requirement?", answer: "10 kW rooftop solar" },
//       { question: "Budget", answer: "5–6 Lakhs" },
//       { question: "Property Type", answer: "Residential" },
//     ]
//   },
//   {
//     _id: "2",
//     name: "Sara Smith",
//     company: "XYZ Technologies",
//     email: "sara@example.com",
//     phone: "9988776655",
//     status: "Contacted",
//     profile_share: true,
//     form_responses: [
//       { question: "What is your requirement?", answer: "10 kW rooftop solar" },
//       { question: "Budget", answer: "5–6 Lakhs" },
//       { question: "Property Type", answer: "Residential" },
//     ]
//   },
// ];

// Mock async call
export const fetchLeads = createAsyncThunk("leads/fetch", async () => {
  try {
    const res = await fetch("https://seonebodev.sunedison.in/bo/api/lead/getLeads");

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const json = await res.json();  // THIS is your actual leads response
    console.log("Fetched Leads:", json);

    return json.data; // return leads array
  } catch (error) {
    console.error("Fetch Leads Error:", error);
    throw error;
  }
});



const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    // ✅ FIXED — reducer MUST be inside "reducers"
    updateLeadStatus: (state, action) => {
      const { id, status } = action.payload;
      const lead = state.list.find((l) => l._id === id);
      if (lead) lead.status = status;
    },

    updateProfileShare: (state, action) => {
      const { id, value } = action.payload;
      const lead = state.list.find((l) => l._id === id);
      if (lead) lead.profile_share = value;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchLeads.rejected, (state) => {
        state.loading = false;
        state.error = "Mock fetch error";
      });
  },
});

// Export actions
export const { updateLeadStatus, updateProfileShare } = leadsSlice.actions;


// Export reducer
export default leadsSlice.reducer;
