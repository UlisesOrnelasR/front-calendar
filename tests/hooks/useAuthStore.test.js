import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { authSlice } from "../../src/store/auth/authSlice";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { NotAuthenticatedState, initialState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";
import { authenticatedState } from "../fixtures/authStates";

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
  beforeEach(() => localStorage.clear()); // Limpiar el local storage en cada test para que no este afectado por otro.

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

  test("startRegister debe de crear un usuario", async () => {
    const newUser = {
      email: "algo@google.com",
      password: "123456789",
      name: "Test User 2",
    };

    const mockStore = getMockStore({ ...NotAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: {
        ok: true,
        uid: "1263781293",
        name: "Test User",
        token: "ALGUN-TOKEN",
      },
    });

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { errorMessage, status, user } = result.current;
    // console.log({ errorMessage, status, user });
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "Test User", uid: "1263781293" },
    });
    spy.mockRestore(); // Destruye el espia para que las demas funciones pasen con normalidad
  });

  test("startRegister debe de fallar en la creación de un usuario", async () => {
    const mockStore = getMockStore({ ...NotAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;
    // console.log({ errorMessage, status, user });
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: expect.any(String),
      status: "not-authenticated",
      user: {},
    });
  });

  test("checkAuthToken debe de fallar si no hay token", async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    // console.log("token", localStorage.getItem("token"));
    await act(async () => {
      await result.current.checkAuthToken();
    });
    const { errorMessage, status, user } = result.current;
    // console.log({ errorMessage, status, user });
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "not-authenticated",
      user: {},
    });
  });

  test("checkAuthToken debe de autenticar un usuario si hay un token", async () => {
    const { data } = await calendarApi.post("/auth", testUserCredentials);
    // console.log(data);
    localStorage.setItem("token", data.token);

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    // console.log("token", localStorage.getItem("token"));
    await act(async () => {
      await result.current.checkAuthToken();
    });
    const { errorMessage, status, user } = result.current;
    // console.log({ errorMessage, status, user });
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "TestUser", uid: "6437462e5946c987bc0c8d06" },
    });
  });
});
