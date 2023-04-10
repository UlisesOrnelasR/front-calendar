import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CalendarPage } from "../calendar";
import { LoginPage } from "../auth";
import { useAuthStore } from "../hooks/useAuthStore";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  // const status = "not-authenticated"; // "checking" | "authenticated" | "not-authenticated"

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h2>Loading</h2>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <Route path="/auth/*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
