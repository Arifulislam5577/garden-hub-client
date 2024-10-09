// "use server";
// import {} from "@/components/auth/SignIn";
// import axios from "axios";
// import { cookies } from "next/headers";
// import { FieldValue } from "react-hook-form";

// export const signInAction = async (formData: FieldValue<any, any, any>) => {
//   try {
//     const { data, status } = await axios.post(
//       `http://localhost:5000/api/v1/user/sign-in`,
//       formData
//     );

//     if (data.success && status === 200) {
//       cookies().set("token", data?.token);
//     }

//     return data?.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getCurrentUser = async () => {
//   try {
//     const token = cookies().get("token")?.value;

//     if (!token) {
//       return null;
//     }

//     const res = await fetch(`http://localhost:5000/api/v1/user/profile`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const { data, success } = await res.json();

//     if (!success) {
//       return null;
//     }

//     return data;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to get new access token");
//   }
// };

// export const logout = () => {
//   cookies().delete("token");
// };
