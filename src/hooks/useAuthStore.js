import { useDispatch, useSelector } from "react-redux";
import { onCheckLogin, onLogin } from "../store/auth/authSlice";
import { calendarApi } from "../api";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const startLogin = async ({ email, password }) => {
    console.log(email, password);

    try {
      const response = await calendarApi.post("/auth", {
        email,
        password,
      });
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    // Propiedades
    status,
    user,
    errorMessage,
    // Métodos
    startLogin,
  };
};
