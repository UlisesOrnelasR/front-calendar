import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime(),
  title: "All Day Event very long title",
  notes: "Some notes about this event",
  start: new Date(),
  end: addHours(new Date(), 1),
  bgcolor: "#fafafa",
  user: {
    _id: "123",
    name: "Ulises",
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
  },
});

export const { onSetActiveEvent } = calendarSlice.actions;