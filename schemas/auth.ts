import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ message: "Email is required!" })
    .email({ message: "Format must be an emaail!" }),
  password: z.string({ message: "Password is required!" }),
});

export const RegisterSchema = z
  .object({
    name: z
      .string({ message: "Name is required!" })
      .min(6, { message: "Name minimal 6 character!" }),
    email: z
      .string({ message: "Email is required!" })
      .email({ message: "Format must be an emaail!" }),
    password: z
      .string({ message: "Password is required!" })
      .min(8, { message: "Password minimal 8 character!" }),
    passwordConfirmation: z
      .string({ message: "Password is required!" })
      .min(8, { message: "Password minimal 8 character!" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match!",
    path: ["passwordConfirmation"],
  });
