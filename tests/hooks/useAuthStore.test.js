import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { authSlice } from "../../src/store/auth/authSlice";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { NotAuthenticatedState, initialState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      //   ui: uiSlice.reducer,
      auth: authSlice.reducer,
    },
    preloadedState: {
      //   ui: { ...initialState },
      auth: {
        ...initialState,
      },
    },
  });
};

describe("Pruebas en useAuthStore", () => {
  test("Debe de regresar los valores por defecto", () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    // console.log(result);
    expect(result.current).toEqual({
      status: "checking",
      user: {},
      errorMessage: undefined,
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
    });
  });

  test("startLogin debe de realizr el login correctamente", async () => {
    localStorage.clear(); // Limpiar el local storage para que no este afectado por otro test
    const mockStore = getMockStore({ ...NotAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });
    // console.log(result.current);
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: {
        name: testUserCredentials.name,
        uid: testUserCredentials.uid,
      },
    });
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  test("startLogin debe de fallar la autenticación", async () => {
    localStorage.clear(); // Limpiar el local storage para que no este afectado por otro test
    const mockStore = getMockStore({ ...NotAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: "emailFalso@gmail.com",
        password: "123456",
      });
    });
    // console.log(result.current);
    const { errorMessage, status, user } = result.current;
    // console.log({ errorMessage, status, user });
    expect(localStorage.getItem("token")).toBe(null);
    expect(localStorage.getItem("token-init-date")).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: expect.any(String),
      status: "not-authenticated",
      user: {},
    });
    // console.log({ errorMessage, status, user });
    waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });
});
