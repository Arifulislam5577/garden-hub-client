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
  isVerified: boolean;
  isPaid: boolean;
};

export type CloudinaryResource = {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  original_filename: string;
};

// export interface IPost {
//   _id: string;
//   content: string;
//   coverImg: string;
//   authorId: string;
//   category: string;
//   tag: string;
//   likes: [{name: }];
//   comments: [];
//   createdAt: "2024-10-11T15:59:59.014Z";
//   comments: [];
//   createdAt: "2024-10-11T15:59:59.014Z";
//   updatedAt: "2024-10-11T15:59:59.014Z";
//   __v: 0;
// }
