import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";

jest.mock("../../src/hooks/useAuthStore");
jest.mock("../../src/calendar", () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe("Pruebas en AppRouter", () => {
  const mockCheckAuthToken = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  beforeEach(() => jest.clearAllTimers()); //Para limpiar los intervalos, en este suite no es necesario

  test("Debe de mostrar la pantalla de carga y llamar checkAuthToken", () => {
    useAuthStore.mockReturnValue({
      status: "checking",
      checkAuthToken: mockCheckAuthToken,
    });
    render(<AppRouter />);
    // screen.debug();
    expect(screen.getByText("Loading")).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test("Debe de mostrar el login en caso de no estar autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/auth2/algo/otracosa"]}>
        {/* Provando el navigate porque la ruta que definimos no existe, entonces manda al login */}
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test("Debe de mostrar el calendario si estamos autenticados", () => {
    useAuthStore.mockReturnValue({
      status: "authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
    // screen.debug();
    expect(screen.getByText("CalendarPage")).toBeTruthy();
  });
});
