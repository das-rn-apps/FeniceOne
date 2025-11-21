import { configureStore } from "@reduxjs/toolkit";
import leadsReducer from "../features/leads/leadsSlice";
import formTemplatesReducer from "../features/formTemplates/formTemplatesSlice";  // ← IMPORTANT




export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    formTemplates: formTemplatesReducer,
  },
});
