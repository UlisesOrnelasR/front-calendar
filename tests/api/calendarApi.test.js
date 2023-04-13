import { calendarApi } from "../../src/api";

describe("Pruebas en el calendarApi", () => {
  test("Debe de tener la configuración por defecto ", () => {
    // console.log(calendarApi);
    // console.log(process.env);
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("Debe de tener el x-token en el header de todas las peticiones", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDM3NDYyZTU5NDZjOTg3YmMwYzhkMDYiLCJuYW1lIjoiVGVzdFVzZXIiLCJpYXQiOjE2ODE0MjI5MjYsImV4cCI6MTY4MTQzMDEyNn0.165R-5aNFC8eLoGr2dxxfGGfdnbxTk362khi16iO3ik";
    localStorage.setItem("token", token);
    const res = await calendarApi.get("/events");
    // console.log(res);
    expect(res.config.headers["x-token"]).toBe(token);
  });
});
