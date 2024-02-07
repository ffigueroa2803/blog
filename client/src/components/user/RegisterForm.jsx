import { useState } from "react";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormRegisterUserSchema } from "../../schemas";
import { useCreateUserMutation } from "../../redux/services/user/userApi";
import { FormError, FormSuccess, OAuth } from "./../../components";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormRegisterUserSchema) });

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleCreateUser = async ({ name, email, password }) => {
    try {
      const resp = await createUser({ name, email, password }).unwrap();
      if (resp) {
        setError("");
        setSuccess(resp?.message);
      }
    } catch (error) {
      setError(error?.data?.message);
      setSuccess("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateUser)}
      className="flex flex-col gap-4"
    >
      {/* User Name */}
      <div>
        <Label value="Your user name" />
        <TextInput
          type="text"
          placeholder="name"
          id="name"
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
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
          <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
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
          <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
        )}
      </div>
      <FormError message={error} setError={setError} />
      <FormSuccess message={success} setSuccess={setSuccess} />
      {/* Button */}
      <Button gradientDuoTone="purpleToPink" type="submit">
        {isLoading ? (
          <div className="">
            <Spinner color="purple" aria-label="Spinner button" size="sm" />
            <span className="pl-3">Cargando...</span>
          </div>
        ) : (
          "Sign Up"
        )}
      </Button>
      {/* Athentication with Google */}
      <OAuth />
    </form>
  );
};

export default RegisterForm;
