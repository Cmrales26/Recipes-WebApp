import { useState } from "react";
import { useForm } from "react-hook-form";
import { UseUser } from "../context/user.context";

const Login = () => {
  const [isCreating, setIscreating] = useState(false);

  const { loginUser, error } = UseUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    isCreating ? console.log(values) : loginUser(values);
  });

  const resetform = () => {
    reset();
    setIscreating(!isCreating);
  };

  const password = watch("password");

  return (
    <>
      {isCreating ? (
        <section>
          <h3>Crear Cuenta</h3>
          {error ? <div className="error"> {error}</div> : null}
          <form onSubmit={onSubmit}>
            <div className="">
              <input
                type="text"
                {...register("name", {
                  required: { value: true, message: "El Nombre es Requerido" },
                  maxLength: {
                    value: 50,
                    message: "El Nombre no debe superar los 50 caracteres",
                  },
                  pattern: {
                    value: /^[^\s\d]+$/,
                    message:
                      "El nombre de usuario no puede contener espacios ni letras",
                  },
                })}
                placeholder="Nombre"
              />
              {errors.name && (
                <div className="error">{errors.name.message}</div>
              )}
            </div>
            <div className="">
              {/* lastname */}
              <input
                type="text"
                {...register("lastname", {
                  required: {
                    value: true,
                    message: "El Apellido es Requerido",
                  },
                  maxLength: {
                    value: 50,
                    message: "El Apellido no debe superar los 50 caracteres",
                  },
                  pattern: {
                    value: /^[^\s\d]+$/,
                    message: "El Apellido no puede contener espacios ni letras",
                  },
                })}
                placeholder="Apellido"
              />
              {errors.lastname && (
                <div className="error">{errors.lastname.message}</div>
              )}
            </div>
            <div className="">
              <input
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El Email es Requerido",
                  },
                  maxLength: {
                    value: 100,
                    message: "El Email no debe superar los 100 caracteres",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "No es un formato valido de Email",
                  },
                })}
                placeholder="Email"
              />
              {errors.email && (
                <div className="error">{errors.email.message}</div>
              )}
            </div>

            <div className="">
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "El Password es Requerido",
                  },
                  minLength: {
                    value: 6,
                    message: "El Password debe tener al menos 6 caracteres",
                  },
                })}
                placeholder="Contraseña"
              />
              {errors.password && (
                <div className="error">{errors.password.message}</div>
              )}
            </div>

            <div className="">
              <input
                type="password"
                {...register("password2", {
                  required: {
                    value: true,
                    message: "El Password es Requerido",
                  },
                  minLength: {
                    value: 6,
                    message: "El Password debe tener al menos 6 caracteres",
                  },
                  validate: (value) => {
                    if (value != password) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                placeholder="Validar Contraseña"
              />
              {errors.password2 && (
                <div className="error">{errors.password2.message}</div>
              )}
            </div>
            <div className="">
              {/* Biografia */}
              <input
                type="text"
                {...register("bio", {
                  required: {
                    value: true,
                    message: "La Biografia es Requerida",
                  },
                  maxLength: {
                    value: 250,
                    message: "La Biografia no debe superar los 250 caracteres",
                  },
                })}
                placeholder="Biografia"
              />
            </div>
            <div className="">
              <button type="submit">Crear Cuenta</button>
              <button type="button" onClick={() => resetform()}>
                {" "}
                Iniciar Sesión
              </button>
            </div>
          </form>
        </section>
      ) : (
        <section>
          <h3>Iniciar Sesion</h3>
          {error ? <div className="error">{error}</div> : null}
          <form onSubmit={onSubmit}>
            <div className="">
              <input
                type="text"
                {...register("username", {
                  required: {
                    value: true,
                    message: "El nombre de usuario es requerido",
                  },
                  maxLength: 50,
                  pattern: {
                    value: /^\S+$/,
                    message: "El nombre de usuario no puede contener espacios",
                  },
                })}
                placeholder="Nombre de usuario"
              />
              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}
            </div>

            <div className="">
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                  maxLength: {
                    value: 50,
                    message:
                      "La contraseña no puede contener mas de 50 caracteres",
                  },
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                  pattern: {
                    value: /^\S+$/,
                    message: "La contraseña no puede contener espacios",
                  },
                })}
                placeholder="Contraseña"
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            <div className="">
              <div className="">
                <button type="submit">iniciar Sesión</button>
                <button type="button" onClick={() => resetform()}>
                  {" "}
                  Crear cuenta
                </button>
              </div>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
