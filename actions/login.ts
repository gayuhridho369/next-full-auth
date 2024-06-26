"use server";

import * as z from "zod";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/token";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validations = LoginSchema.safeParse(values);

  if (!validations.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validations.data;

  const existungUser = await getUserByEmail(email);

  if (!existungUser || !existungUser?.email || !existungUser.password) {
    return { error: "Email does dont exist!" };
  }

  if (!existungUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existungUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid Credentials",
          };
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }

    throw error;
  }
};
