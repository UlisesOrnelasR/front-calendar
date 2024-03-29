import { act, renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks/useUiStore";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../../src/store/ui/uiSlice";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe("Pruebas en useUiStore", () => {
  test("Debe de regresar los valores por defecto", () => {
    const mockStore = getMockStore({
      isDateModalOpen: false,
    });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    // console.log(result);
    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    });
  });

  test("openDateModal debe de colocar true en el isDateModalOpen", () => {
    const mockStore = getMockStore({
      isDateModalOpen: false,
    });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    // console.log(result.current);

    const { openDateModal } = result.current;

    act(() => {
      openDateModal();
    });
    // console.log(result.current);
    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test("closeDateModal debe de colocar true en el isDateModalOpen", () => {
    const mockStore = getMockStore({
      isDateModalOpen: true,
    });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    // console.log(result.current);
    act(() => {
      result.current.closeDateModal();
    });
    // console.log(result.current);
    expect(result.current.isDateModalOpen).toBeFalsy();
  });

  test("toggleDateModal debe de alternar el estado booleano", () => {
    const mockStore = getMockStore({
      isDateModalOpen: true,
    });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    // console.log(result.current);
    act(() => {
      result.current.toggleDateModal();
    });
    // console.log(result.current);
    expect(result.current.isDateModalOpen).toBeFalsy();
    act(() => {
      result.current.toggleDateModal();
    });
    expect(result.current.isDateModalOpen).toBeTruthy();
  });
});
