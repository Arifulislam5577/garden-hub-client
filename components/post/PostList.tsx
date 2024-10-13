"use client";
import { useQuery } from "@tanstack/react-query";
import Post from "../shared/Post";

const PostList = () => {
  const fetchPostList = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/post`);
    const data = await res.json();
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: fetchPostList,
  });
  return (
    <div
      id="scroll-bar"
      className="col-span-8 h-[calc(100vh-75px)] overflow-y-auto py-5 space-y-5"
    >
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl font-bold">Loading...</p>
        </div>
      )}
      {data?.data?.map((post: any) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
