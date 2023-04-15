import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

jest.mock("../../../src/hooks/useCalendarStore");

describe("Pruebas en <FabDelete/>", () => {
  const mockStartDeletingEvent = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  beforeEach(() => jest.clearAllTimers()); //Para limpiar los intervalos, en este suite no es necesario

  test("Debe de mostrar el componente correctamente", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });

    render(<FabDelete />);
    // screen.debug();

    const btn = screen.getByLabelText("btn-delete");
    // console.log(btn.classList.toString());
    expect(btn.classList).toContain("btn");
    expect(btn.classList).toContain("fab-danger");
    expect(btn.classList).toContain("btn-warning");
    expect(btn.style.display).toBe("none");
  });

  test("Debe de mostrar el boton si hay un evento activo", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });

    render(<FabDelete />);
    // screen.debug();
    const btn = screen.getByLabelText("btn-delete");
    expect(btn.style.display).toBe("");
  });

  test("Debe de llamar startDeletingEvent si hay evento activo", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });

    render(<FabDelete />);
    // screen.debug();
    const btn = screen.getByLabelText("btn-delete");
    fireEvent.click(btn);
    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });
});
