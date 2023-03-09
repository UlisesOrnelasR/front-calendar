import React from "react";

export const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <>
      <span>{title}</span>
      <span>- {user.name}</span>
    </>
  );
};
