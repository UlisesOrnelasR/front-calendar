import {
  calendarSlice,
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithEventsState,
  events,
  initialState,
} from "../../fixtures/calendarStates";

describe("Pruebas en calendarSlice", () => {
  test("Debe de regresar el estado por defecto", () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test("onSetActiveEvent debe de activar el evento", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );
    // console.log(state);
    expect(state.activeEvent).toEqual(events[0]);
  });

  test("onAddNewEvent debe de agregar el evento", () => {
    const newEvent = {
      id: "9",
      title: "Cenar en Piloncillos",
      notes: "Pedir una crepa de chocolate",
      start: new Date("2023-01-24 16:00:00"),
      end: new Date("2023-01-24 20:00:00"),
    };
    // console.log(calendarWithEventsState);
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );
    // console.log(state);
    expect(state.events).toEqual([...events, newEvent]);
  });

  test("onUpdateEvent debe de actualizar el evento", () => {
    const updatedEvent = {
      id: "1",
      title: "Cenar en Piloncillos con mi novia",
      notes: "Pedir una crepa de chocolate y nueces actualizado",
      start: new Date("2023-01-24 17:00:00"),
      end: new Date("2023-01-24 21:00:00"),
    };
    // console.log(calendarWithEventsState);
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );
    // console.log(state);
    expect(state.events).toContain(updatedEvent);
  });
});
