import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} from "../store/calendar/calendarSlice";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // Todo bien
    try {
      if (calendarEvent.id) {
        //actualizando un evento
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      //creando un nuevo evento
      const { data } = await calendarApi.post("/events", calendarEvent);
      console.log(data);
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          id: data.event.id,
          user,
        })
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Error on save event", error.response.data.msg, "error");
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      Swal.fire("Error on delete event", error.response.data.msg, "error");
      console.log(error);
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.events);
      console.log(events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error loading events");
      console.log(error);
    }
  };

  return {
    // Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    // Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
