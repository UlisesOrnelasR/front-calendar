import {
  authSlice,
  clearErrorMessage,
  onCheckLogin,
  onLogin,
  onLogout,
} from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe("Pruebas en authSlice", () => {
  test("Debe de regresar el estado inicial", () => {
    // console.log(authSlice.getInitialState());
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test("Debe de realizar un login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    // console.log(state);
    expect(state).toEqual({
      status: "authenticated",
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test("Debe de realizar el logout", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    });
  });

  test("Debe de realizar el logout con mensaje de error", () => {
    const errorMessage = "Credenciales no válidas";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: errorMessage,
    });
  });

  test("Debe de limpiar el msg de error", () => {
    const errorMessage = "Credenciales no válidas";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    // console.log(state);
    const newState = authSlice.reducer(state, clearErrorMessage());
    // console.log(newState);
    expect(newState.errorMessage).toBe(undefined);
  });

  test("Debe de cambiar al estado inicial cuando se dispare el onCheckLogin", () => {
    // console.log(authenticatedState);
    const state = authSlice.reducer(authenticatedState, onCheckLogin());
    // console.log(state);
    expect(state).toEqual(initialState);
  });
});
