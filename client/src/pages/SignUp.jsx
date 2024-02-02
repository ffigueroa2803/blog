import { useState } from "react";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormRegisterUserSchema } from "../schemas";
import { useCreateUserMutation } from "../redux/services/user/userApi";
import { FormError, FormSuccess } from "./../components";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormRegisterUserSchema) });

  const [createUser, { data, isLoading, error: userError }] =
    useCreateUserMutation();

  const handleCreateUser = async ({ name, email, password }) => {
    try {
      const resp = await createUser({ name, email, password }).unwrap();
      if (resp) setSuccess(resp?.message);
    } catch (error) {
      setError(error?.data?.message);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-3 max-w-3xl mx-auto">
        {/* Left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Sahand's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* Right */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit(handleCreateUser)}
            className="flex flex-col gap-4"
          >
            {/* Username */}
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                {...register("name")}
              />
              {errors.name?.message && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* Email */}
            <div>
              <Label value="Your email" />
              <TextInput
                type="Email"
                placeholder="example@gmail.com"
                id="email"
                {...register("email")}
              />
              {errors.email?.message && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Password */}
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                {...register("password")}
              />
              {errors.password?.message && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <FormError message={error} setError={setError} />
            <FormSuccess message={success} setSuccess={setSuccess} />
            {/* Button */}
            <Button gradientDuoTone="purpleToPink" type="submit">
              {isLoading ? (
                <div className="">
                  <Spinner
                    color="purple"
                    aria-label="Spinner button"
                    size="sm"
                  />
                  <span className="pl-3">Cargando...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
