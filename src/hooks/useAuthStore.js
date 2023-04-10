import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  onCheckLogin,
  onLogin,
  onLogout,
  clearErrorNessage,
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const startLogin = async ({ email, password }) => {
    dispatch(onCheckLogin());
    try {
      const { data } = await calendarApi.post("/auth", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime()); //Sirve para hacer calculos con la duracion del token
      dispatch(
        onLogin({
          name: data.name,
          uid: data.uid,
        })
      );
    } catch (error) {
      dispatch(
        onLogout(
          "Unfortunately, the credentials you provided for login are not correct."
        )
      );
      setTimeout(() => {
        dispatch(clearErrorNessage());
      }, 500);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onCheckLogin());
    try {
      const { data } = await calendarApi.post("/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime()); //Sirve para hacer calculos con la duracion del token
      dispatch(
        onLogin({
          name: data.name,
          uid: data.uid,
        })
      );
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || "Failed to register"));
      setTimeout(() => {
        dispatch(clearErrorNessage());
      }, 500);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());
    try {
      const { data } = calendarApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime()); //Sirve para hacer calculos con la duracion del token
      dispatch(
        onLogin({
          name: data.name,
          uid: data.uid,
        })
      );
    } catch (error) {
      localStorage.clear();
      if (!token) return dispatch(onLogout());
    }
  };

  return {
    // Propiedades
    status,
    user,
    errorMessage,
    // Métodos
    startLogin,
    startRegister,
    checkAuthToken,
  };
};
