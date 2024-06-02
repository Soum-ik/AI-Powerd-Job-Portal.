import SignInForm from "@/components/shared/Forms/logInForm";
function page() {
  return (
    <div className="mt-32 md:min-h-[60vh]  max-w-5xl px-3 mx-auto my-5">
      <div className="  flex items-center justify-center  text-white">
        <SignInForm />
      </div>
    </div>
  );
}

export default page;
