import { useDispatch, useSelector } from "react-redux";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.calendar);

  return {
    // Propiedades
    events,
    // Métodos
  };
};
