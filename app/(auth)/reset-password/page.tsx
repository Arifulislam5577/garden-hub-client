import ResetPassword from "@/components/auth/ResetPassword";

const page = () => {
  return (
    <section className="h-screen grid place-items-center">
      <div className="max-w-md mx-auto w-full bg-white p-8 space-y-5">
        <div className="space-y-1.5 text-center">
          <p className="text-2xl font-bold">
            <span className="text-green-500">Garden</span>Hub
          </p>
          <p className="text-base font-medium text-slate-600">
            Enter email and reset token to reset your password.
          </p>
        </div>
        <ResetPassword />
      </div>
    </section>
  );
};

export default page;
