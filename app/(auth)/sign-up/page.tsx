import SignUp from "@/components/auth/SignUp";
import Link from "next/link";

const page = () => {
  return (
    <section className="h-screen grid place-items-center">
      <div className="max-w-md mx-auto w-full bg-white p-8 space-y-5">
        <div className="space-y-1.5 text-center">
          <p className="text-2xl font-bold">
            <span className="text-green-500">Garden</span>Hub
          </p>
          <p className="text-base font-medium text-slate-600">
            Please create an account to share your tips.
          </p>
          <p className="text-base font-medium text-slate-600">
            Already have an account?
            <Link
              href="/sign-in"
              className="text-green-500 underline ml-2 text-base"
            >
              Sign In
            </Link>
          </p>
        </div>
        <SignUp />
      </div>
    </section>
  );
};

export default page;
