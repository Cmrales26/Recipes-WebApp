// import { Box, TextField } from "@mui/material";
// import { useForm } from "react-hook-form";

// const InsertEmail = (props) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = handleSubmit((value) => {
//     console.log(value);
//   });

//   return (
//     <section className="InserEmailContainer">
//       <h3>Ingrese El codigo de validación</h3>
//       <p>
//         Por su seguridad hemos enviado un codigo de verficación al correo:{" "}
//         <b>{props.user.email} </b>Ingreslo en el campo inferior para continuar
//         con el proceso de reactivación de la cuenta
//       </p>
//       <Box
//         component="form"
//         sx={{
//           "& > :not(style)": { m: 1, width: "25ch" },
//         }}
//         noValidate
//         autoComplete="off"
//         onSubmit={onSubmit}
//       >
//         <TextField
//           required
//           label="Email"
//           type="email"
//           {...register("email", {
//             required: {
//               value: true,
//               message: "El Email es Requerido",
//             },
//             maxLength: {
//               value: 100,
//               message: "El Email no debe superar los 100 caracteres",
//             },
//             pattern: {
//               value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//               message: "No es un formato valido de Email",
//             },
//           })}
//         />
//         {errors.email && <div className="error">{errors.email.message}</div>}
//       </Box>
//     </section>
//   );
// };

// export default InsertEmail;
