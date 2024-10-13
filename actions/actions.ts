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
      error.response?.data?.message || error.message || "Failed to Update";
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
      error.response?.data?.message || error.message || "Failed to Reset";
    throw new Error(message);
  }
};

export const updateProfileAction = async (formData: FieldValues) => {
  try {
    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    const message =
      error.response?.data?.message || error.message || "Failed to Update";
    throw new Error(message);
  }
};

export const changePasswordAction = async (formData: FieldValues) => {
  try {
    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/change-password`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    const message =
      error.response?.data?.message || error.message || "Failed to Update";
    throw new Error(message);
  }
};

export const createPostAction = async (formData: FieldValues) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/post`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    const message =
      error.response?.data?.message || error.message || "Failed to Create Post";
    throw new Error(message);
  }
};

export const postLikeAction = async (postId: string) => {
  try {
    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/post/${postId}`,
      null,
      {
        headers: {
          authorization: `Bearer ${cookies().get("token")?.value}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    const message =
      error.response?.data?.message || error.message || "Failed to Create Post";
    throw new Error(message);
  }
};

export const postCommentAction = async (formData: FieldValues) => {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/post/${formData?.postId}`,
      formData?.commentText,
      {
        headers: {
          authorization: `Bearer ${cookies().get("token")?.value}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.log(error);
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to Create comment";
    throw new Error(message);
  }
};
