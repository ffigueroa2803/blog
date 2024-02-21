import { Link } from "react-router-dom";
import { RegisterForm } from "../components";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-3 max-w-3xl mx-auto">
        {/* Left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Frankie's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Este es un proyecto de demostración. Puedes registrarte con tu
            correo electrónico y contraseña o con Google.
          </p>
        </div>
        {/* Right */}
        <div className="flex-1">
          <RegisterForm />
          <div className="flex gap-2 mt-5">
            <span>¿Tener una cuenta?</span>
            <Link to="/sign-in" className="text-blue-500">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
