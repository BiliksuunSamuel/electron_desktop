import { createSlice } from "@reduxjs/toolkit";
import { SettingsReducerState } from "../../data/ReducerState";

const SettingsReducer = createSlice({
  name: "SettingsReducer",
  initialState: SettingsReducerState,
  reducers: {
    SetNetworkState: (state, action) => {
      state.online = action.payload;
    },
    SetOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export default SettingsReducer.reducer;

export const { SetNetworkState, SetOrder } = SettingsReducer.actions;
