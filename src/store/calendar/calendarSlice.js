import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    counter: 10,
  },
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
  },
});

export const { increment } = calendarSlice.actions;
