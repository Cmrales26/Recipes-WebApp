import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name is too long" })
    .refine((value) => value.trim() || !isNaN === value, {
      message: "Name can not contains spaces or numbers",
    }),

  lastname: z
    .string({
      required_error: "Last name is required",
    })
    .min(1, { message: "Lastname is required" })
    .max(50, { message: "Lastname is too long" })
    .refine((value) => value.trim() || !isNaN === value, {
      message: "Lastname can not contains spaces or numbers",
    }),

  username: z
    .string({
      required_error: "Username is required",
    })
    .min(1, { message: "Username is required" })
    .max(50, { message: "Username is too long" })
    .refine((value) => value.trim() === value, {
      message: "Name can not contains spaces",
    }),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "This is not a valid email address" })
    .refine((value) => value.trim() === value, {
      mesaage: "email can not contain spaces",
    }),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" }),

  bio: z
    .string()
    .max(250, { message: "Bio is too long" })
    .refine((value) => value.trim() === value, {
      message: "Bio can not contain spaces",
    })
    .optional(),
});

export const loginScheme = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(1, { message: "Username is required" })
    .max(50, { message: "Username is too long" })
    .refine((value) => value.trim() === value, {
      message: "Name can not contains spaces",
    }),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const changepasswordschema = z.object({
  newpassword: z
    .string({
      required_error: "New password is required",
    })
    .min(6, { message: "New password must be at least 6 characters long" }),
});
