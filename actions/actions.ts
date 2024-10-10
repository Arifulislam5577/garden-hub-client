/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { signIn } from "@/app/auth";
import axios from "axios";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const signInAction = async (formData: FieldValues) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/sign-in`,
      formData
    );

    if (data.success) {
      cookies().set("token", data?.token);

      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      return { ...data, signInRes: res };
    }

    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Failed to sign In";
    throw new Error(message);
  }
};

export const signUpAction = async (formData: FieldValues) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/sign-up`,
      formData
    );

    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Failed to sign up";
    throw new Error(message);
  }
};

export const forgotPasswordAction = async (formData: FieldValues) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/forgot-password`,
      formData
    );

    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Failed to sign up";
    throw new Error(message);
  }
};

export const resetPasswordAction = async (formData: FieldValues) => {
  try {
    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/reset-password`,
      formData
    );

    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Failed to sign up";
    throw new Error(message);
  }
};
