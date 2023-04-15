import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock("../../src/hooks/useAuthStore");

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
});
