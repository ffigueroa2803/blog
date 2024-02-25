import { Button, Modal, Spinner, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "./../lib/firebase";
import { FormRegisterUserSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormError, FormSuccess } from "../components";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../redux/services/user/userApi";
import {
  signUpSuccess,
  signoutSuccess,
} from "../redux/features/auth/authSlice";
import { useCloseSessionMutation } from "../redux/services/auth/authApi";
import avatar from "../assets/avatar-default.png";

const Profile = () => {
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { currentUser } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormRegisterUserSchema) });

  const [
    updateUser,
    {
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete, isError: isErrorDelete }] =
    useDeleteUserMutation();
  const [closeSession, { isLoading: isLoadingCloseSession }] =
    useCloseSessionMutation();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "No se pudo cargar la imagen (el archivo debe tener menos de 2 MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleUpdateUser = async ({ name, email, password }, e) => {
    e.preventDefault();
    try {
      const resp = await updateUser({
        id: currentUser?.user?.id,
        name,
        email,
        image: imageFileUrl,
        password,
      }).unwrap();
      if (resp) {
        setError("");
        setSuccess(resp?.message);
        dispatch(
          signUpSuccess({
            name,
            email,
            image:
              imageFileUrl === null ? currentUser?.user?.image : imageFileUrl,
          })
        );
      }
    } catch (error) {
      setError(error?.data?.message);
      setSuccess("");
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const resp = await deleteUser({ id: currentUser?.user?.id }).unwrap();
      if (resp) {
        setError("");
        setSuccess(resp?.message);
        handleSignout();
      }
    } catch (error) {
      setError(error?.data?.message);
      setSuccess("");
    }
  };

  const handleSignout = async () => {
    try {
      const resp = await closeSession().unwrap();
      if (resp?.statusCode === 200) {
        setShowModal(false);
        dispatch(signoutSuccess());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser?.user?.image === null && imageFileUrl === null)
      setImageFileUrl(avatar);
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Perfil</h1>
      {/* Form profile */}
      <form
        onSubmit={handleSubmit(handleUpdateUser)}
        className="flex flex-col gap-4"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        {/* CircularProgressbar */}
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser?.user?.image}
            alt=""
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <FormError
            message={imageFileUploadError}
            setError={setImageFileUploadError}
          />
        )}
        {/* Nombre de usuario */}
        <TextInput
          type="text"
          placeholder="usuario"
          id="name"
          defaultValue={currentUser?.user?.name}
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
        )}
        {/* Correo electrónico */}
        <TextInput
          type="Email"
          placeholder="example@gmail.com"
          id="email"
          defaultValue={currentUser?.user?.email}
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
        )}
        {/* Password */}
        <TextInput
          type="password"
          placeholder="********"
          id="password"
          {...register("password")}
        />
        {errors.password?.message && (
          <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
        )}
        {/* Button update */}
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={isLoadingUpdate || imageFileUploading}
        >
          {isLoadingUpdate ? (
            <div className="">
              <Spinner color="purple" aria-label="Spinner button" size="sm" />
              <span className="pl-3">Cargando...</span>
            </div>
          ) : (
            "Actualizar"
          )}
        </Button>
        {/* Create a post */}
        {currentUser?.user?.role === "ADMIN" && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="w-full"
            >
              Crear una publicación
            </Button>
          </Link>
        )}
      </form>
      {/* Option Delete account && Sign off */}
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Borrar cuenta
        </span>
        <span onClick={handleSignout} className="cursor-pointer">
          Cerrar sesión
        </span>
      </div>
      {/* Display Error or Success */}
      <div className="mt-4">
        {(isErrorUpdate || isErrorDelete) && (
          <FormError message={error} setError={setError} />
        )}
        {isSuccessUpdate && (
          <FormSuccess message={success} setSuccess={setSuccess} />
        )}
      </div>
      {/* Modal Delete */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              ¿Estás segura de que quieres eliminar tu cuenta?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                disabled={isLoadingDelete}
                onClick={handleDeleteUser}
              >
                {isLoadingDelete ? (
                  <div className="">
                    <Spinner
                      color="purple"
                      aria-label="Spinner button"
                      size="sm"
                    />
                    <span className="pl-3">Cargando...</span>
                  </div>
                ) : (
                  "Si estoy seguro"
                )}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
