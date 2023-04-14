import { calendarApi } from "../../src/api";

describe("Pruebas en el calendarApi", () => {
  test("Debe de tener la configuración por defecto ", () => {
    // console.log(calendarApi);
    // console.log(process.env);
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("Debe de tener el x-token en el header de todas las peticiones", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDM3NDYyZTU5NDZjOTg3YmMwYzhkMDYiLCJuYW1lIjoiVGVzdFVzZXIiLCJpYXQiOjE2ODE0OTY1MDMsImV4cCI6MTY4MTUwMzcwM30.L-Kp9H8qAq2DcwKJm8xbU-WKV7bzV4HEukMRTm893kM";
    localStorage.setItem("token", token);
    const res = await calendarApi.get("/events");
    // console.log(res);
    expect(res.config.headers["x-token"]).toBe(token);
  });
});
