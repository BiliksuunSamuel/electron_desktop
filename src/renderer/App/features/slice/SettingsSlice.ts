import { createSlice } from "@reduxjs/toolkit";
import { SettingsReducerState } from "../../data/ReducerState";

const SettingsReducer = createSlice({
  name: "SettingsReducer",
  initialState: SettingsReducerState,
  reducers: {
    SetNetworkState: (state, action) => {
      state.online = action.payload;
    },
  },
});

export default SettingsReducer.reducer;

export const { SetNetworkState } = SettingsReducer.actions;
