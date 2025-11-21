import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock form templates
// const MOCK_TEMPLATES = [
//   {
//     id: "template1",
//     name: "Basic Lead Form",
//     fields: [
//       { key: "name", label: "Lead Name", type: "text" },
//       { key: "email", label: "Email", type: "email" },
//       { key: "phone", label: "Phone", type: "text" },
//       { key: "company", label: "Company", type: "text" }
//     ]
//   }
// ];
const MOCK_TEMPLATES = [{
  id: "solar_survey_01",
  name: "Solar Site Survey Form",
  fields: [
    { key: "site_location", label: "Site Location", type: "text", required: true },
    { key: "customer_name", label: "Customer Name", type: "text", required: true },
    { key: "phone", label: "Phone Number", type: "text", required: true },
    { key: "survey_date", label: "Survey Date", type: "date", required: true },
    { key: "roof_type", label: "Roof Type", type: "select", options: ["RCC", "Metal Sheet", "Asbestos", "Tile"] },
    { key: "shadow_analysis", label: "Shadow Analysis", type: "select", options: ["Yes", "No"] },
    { key: "available_area", label: "Available Rooftop Area (sqft)", type: "number" },
    { key: "load_requirement", label: "Load Requirement (kW)", type: "number" },
    { key: "distance_to_meter", label: "Distance to Main Meter (meters)", type: "number" },
    { key: "panel_mount_type", label: "Mount Type", type: "select", options: ["Rooftop", "Ground Mounted"] },
    { key: "notes", label: "Additional Comments", type: "textarea" }
  ]
}];


export const fetchTemplates = createAsyncThunk(
  "formTemplates/fetch",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_TEMPLATES), 400);
    });
  }
);

const formTemplatesSlice = createSlice({
  name: "formTemplates",
  initialState: {
    templates: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      });
  }
});

export default formTemplatesSlice.reducer;
