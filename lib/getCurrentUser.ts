import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return null;
    }

    const res = await fetch(`http://localhost:5000/api/v1/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { data, success } = await res.json();

    if (!success) {
      return null;
    }

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get new access token");
  }
};
