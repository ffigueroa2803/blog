import { useState } from "react";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormLoginSchema } from "../../schemas";
import { FormError, FormSuccess, OAuth } from "./../../components";
import { useLoginMutation } from "../../redux/services/auth/authApi";
import { signInSuccess } from "../../redux/features/auth/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormLoginSchema) });

  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();

  const handleCreateUser = async ({ email, password }, e) => {
    e.preventDefault();
    try {
      const resp = await login({ email, password }).unwrap();
      if (resp) {
        setError("");
        setSuccess(resp?.message);
        dispatch(signInSuccess(resp));
        navigate("/");
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
      {/* Email */}
      <div>
        <Label value="Correo electrónico" />
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
        <Label value="Contraseña" />
        <TextInput
          type="password"
          placeholder="********"
          id="password"
          {...register("password")}
        />
        {errors.password?.message && (
          <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
        )}
      </div>
      {isError && <FormError message={error} setError={setError} />}
      {isSuccess && <FormSuccess message={success} setSuccess={setSuccess} />}
      {/* Button */}
      <Button gradientDuoTone="purpleToPink" type="submit">
        {isLoading ? (
          <div className="">
            <Spinner color="purple" aria-label="Spinner button" size="sm" />
            <span className="pl-3">Cargando...</span>
          </div>
        ) : (
          "Iniciar sesión"
        )}
      </Button>
      {/* Athentication with Google */}
      <OAuth />
    </form>
  );
};

export default LoginForm;
