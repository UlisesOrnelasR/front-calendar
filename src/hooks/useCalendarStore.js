import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // Todo bien
    if (calendarEvent._id) {
      //actualizando un evento existente
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
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
    }
  };

  const startDeletingEvent = () => {
    // TODO: llegar al backend

    // Todo bien
    dispatch(onDeleteEvent());
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
  };
};
