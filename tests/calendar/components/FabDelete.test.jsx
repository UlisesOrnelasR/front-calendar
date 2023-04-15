import { render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";

jest.mock("../../../src/hooks/useCalendarStore");

describe("Pruebas en <FabDelete/>", () => {
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
});
