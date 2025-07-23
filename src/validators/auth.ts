import { z } from "zod";

/* ---------------- Shared ---------------- */

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
// must contain: lowercase, uppercase, number, special

const passwordMsg =
  "Password must include upper, lower, number, and special char.";

/* Username: alphanum, 3–50 */
export const usernameAlphanumSchema = z
  .string()
  .min(3)
  .max(50)
  .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric.");

/* ---------------- Signup ---------------- */
export const signupSchema = z.object({
  username: usernameAlphanumSchema,
  password: z
    .string()
    .min(8)
    .max(64)
    .regex(PASSWORD_REGEX, { message: passwordMsg }),
  resetPasswordSecret: z.string().min(4).max(128),
});

/* ---------------- Login ---------------- */
/* Joi just required strings; no other constraints. */
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

/* ---------------- Update Password ---------------- */
export const updatePasswordSchema = z.object({
  username: z.string().min(1, "Username is required."),
  resetSecret: z.string().min(1, "Reset secret is required."),
  newPassword: z.string().min(8).max(64).regex(PASSWORD_REGEX, {
    message:
      "New password must include upper, lower, number, and special char.",
  }),
});

/* ---------------- Update Username ---------------- */
export const updateUsernameSchema = z.object({
  username: z.string().min(1, "Current username is required."), // current username
  resetSecret: z.string().min(1, "Reset secret is required."),
  newUsername: usernameAlphanumSchema,
});

/* ---------------- Types ---------------- */
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
export type UpdateUsernameInput = z.infer<typeof updateUsernameSchema>;
