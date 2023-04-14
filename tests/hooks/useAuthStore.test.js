import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { authSlice } from "../../src/store/auth/authSlice";
import { useAuthStore } from "../../src/hooks/useAuthStore";

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
    const mockStore = getMockStore({
      status: "checking",
      user: {},
      errorMessage: undefined,
    });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    console.log(result);
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
});
