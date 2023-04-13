import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from "../../../src/store/ui/uiSlice";

describe("Pruebas en uiSlice", () => {
  test("Debe de regresar el estado por defect ", () => {
    // console.log(uiSlice.getInitialState());
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
  });

  test("Debe de cambiar el isDateModalOpen correctamente", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    // console.log(state);
    expect(state.isDateModalOpen).toBeTruthy();
    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
