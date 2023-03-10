import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";
import { localizer } from "../../helpers";

import { CalendarEvent, CalendarModal, Navbar } from "../";
import { getMessagesEs } from "../../helpers";
import { useUiStore } from "../../hooks/useUiStore";

const events = [
  {
    title: "All Day Event very long title",
    notes: "Some notes about this event",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgcolor: "#fafafa",
    user: {
      _id: "123",
      name: "Ulises",
    },
  },
];

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return style;
  };

  const onSelect = (event) => {
    console.log({
      onSelect: event,
    });
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onViewChanged = (event) => {
    console.log({ onViewChange: event });
    localStorage.setItem("lastView", event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        defaultView={lastView}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
    </>
  );
};
