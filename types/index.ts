export type TError = {
  data: {
    success: boolean;
    statusCode: number;
    message: string;
  };
  status: number;
};

export type TErrorResponse = TError | Error;

export type TUser = {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  img?: string;
  role: "user" | "admin";
  updatedAt: string;
  createdAt: string;
};
