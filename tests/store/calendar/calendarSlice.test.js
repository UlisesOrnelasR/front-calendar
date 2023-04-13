import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithActiveEventState,
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

  test("onDeleteEvent Debe de borrar el evento activo", () => {
    // console.log(calendarWithActiveEventState);
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    // console.log(state);
    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
  });

  test("onLoadEvents Debe de establecer los eventos", () => {
    // console.log("Initial state", calendarSlice.getInitialState());
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    // console.log(state);
    expect(state.events).toEqual(events);
    expect(state.isLoadingEvents).toBeFalsy();

    const newState = calendarSlice.reducer(state, onLoadEvents(events));
    expect(newState.events.length).toBe(events.length);
  });
  test("onLogoutCalendar Debe de limpiar el estado", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onLogoutCalendar()
    );
    // console.log("logout", state);
    expect(state).toEqual(initialState);
  });
});
