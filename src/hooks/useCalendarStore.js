import { useDispatch, useSelector } from "react-redux";
import {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: llegar al backend

    // Todo bien
    if (calendarEvent._id) {
      //actualizando un evento existente
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      //creando un nuevo evento
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          _id: new Date().getTime(),
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
