import { useEffect } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../hooks/useAuthStore";
import "./LoginPage.css";
import Swal from "sweetalert2";

export const LoginPage = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm();

  const loginSubmit = ({ loginEmail, loginPassword }) => {
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const registerSubmit = ({
    registerEmail,
    registerName,
    registerPassword,
    registerPassword2,
  }) => {
    if (registerPassword !== registerPassword2) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }
    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Authentication failed", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleSubmit(loginSubmit)}>
            <div className="form-group mb-2">
              <input
                type="text"
                className={
                  errors.loginEmail?.type === "required" ||
                  errors.loginEmail?.type === "pattern"
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Correo"
                {...register("loginEmail", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                {...register("loginPassword", {
                  required: true,
                })}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleSubmit2(registerSubmit)}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                {...register2("registerName", {
                  required: true,
                })}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className={
                  errors2.registerEmail?.type === "required" ||
                  errors2.registerEmail?.type === "pattern"
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Correo"
                {...register2("registerEmail", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                {...register2("registerPassword", {
                  required: true,
                })}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                {...register2("registerPassword2", {
                  required: true,
                })}
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
