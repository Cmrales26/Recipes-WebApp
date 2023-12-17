import { useForm } from "react-hook-form";
import { UseUser } from "../context/user.context";
import PropTypes from "prop-types";

const LoginUserForm = (props) => {
  const { loginUser, error } = UseUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    loginUser(values);
  });

  const resetform = () => {
    reset();
    props.setIsCreating(!props.isCreating);
  };

  return (
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
                message: "La contraseña no puede contener mas de 50 caracteres",
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
  );
};

LoginUserForm.propTypes = {
  setIsCreating: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
};

export default LoginUserForm;
