import { z } from "zod";

const signUpValidator = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(4, {
      message: "Name must be at least 4 characters",
    }),
  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    })
    .min(4, {
      message: "Address must be at least 4 characters",
    }),
  phone: z
    .string({
      required_error: "Phone is required",
      invalid_type_error: "Phone must be a string",
    })
    .min(11, {
      message: "Phone must be at least 11 characters",
    }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email must be a valid email address" })
    .trim(),
  pass: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

const signInValidator = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email must be a valid email address" })
    .trim(),
  pass: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});
const forgotPasswordValidator = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email must be a valid email address" })
    .trim(),
});
const resetPasswordValidator = z.object({
  pass: z
    .string({
      required_error: "New Password is required",
      invalid_type_error: "New Password must be a string",
    })
    .min(6, {
      message: "New Password must be at least 6 characters",
    }),
  token: z.string({ required_error: "Reset token is required" }).min(6, {
    message: "Reset token must be 6 characters",
  }),
});
const changePasswordValidator = z.object({
  newPassword: z
    .string({
      required_error: "New Password is required",
      invalid_type_error: "New Password must be a string",
    })
    .min(6, {
      message: "New Password must be at least 6 characters",
    }),
  newPasswordConfirm: z
    .string({
      required_error: "Confirm New Password is required",
      invalid_type_error: "New Password must be a string",
    })
    .min(6, {
      message: "New Password must be at least 6 characters",
    }),
  oldPassword: z
    .string({
      required_error: "Current Password is required",
      invalid_type_error: "Current Password must be a string",
    })
    .min(6, {
      message: "Current Password must be at least 6 characters",
    }),
});

export {
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  signInValidator,
  signUpValidator,
};
