export const events = [
  {
    id: "1",
    title: "Cumpleaños de Ulises",
    notes: "Testing notes",
    start: new Date("2022-10-21 13:00:00"),
    end: new Date("2022-10-21 15:00:00"),
  },
  {
    id: "2",
    title: "Cumpleaños de Fanny",
    notes: "Testing notes Fanny",
    start: new Date("2022-03-24 11:00:00"),
    end: new Date("2022-03-24 12:00:00"),
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events], //Con esparcir el objeto se rompe la referencia y se crea nuevo objeto
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: {
    ...events[0],
  },
};
