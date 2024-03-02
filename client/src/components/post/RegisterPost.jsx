import { useState } from "react";
import {
  Alert,
  Button,
  FileInput,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../lib/firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { FormRegisterPostSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreatePostMutation } from "../../redux/services/post/postApi";
import { FormError, FormSuccess } from "../../components";

const RegisterPost = () => {
  const { quill, quillRef } = useQuill();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormRegisterPostSchema),
    defaultValues: {
      title: "",
      category: "",
    },
  });

  const [
    createPost,
    {
      isLoading: isLoadingPost,
      isError: isErrorPost,
      isSuccess: isSuccessPost,
    },
  ] = useCreatePostMutation();

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Por favor seleccione una imagen");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Error al subir la imagen");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setImageUrl(downloadURL);
          });
        }
      );
    } catch (error) {
      setImageUploadError("Error al subir la imagen");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleCreatePost = async ({ title, category }) => {
    try {
      const resp = await createPost({
        title,
        content: quill.getText(),
        image: imageUrl,
        category,
      }).unwrap();
      if (resp) {
        setError("");
        setSuccess(resp?.message);
        setFile(null);
        setImageUrl(null);
        reset();
        quill.setText("");
        navigate(`/post/${resp?.post?.slug}`);
      }
    } catch (error) {
      setError(error?.data?.message);
      setSuccess("");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Crear una publicación
      </h1>
      {/* Form Post */}
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleCreatePost)}
      >
        {/* Display Error or Success */}
        <div className="mt-2">
          {isErrorPost && <FormError message={error} setError={setError} />}
          {isSuccessPost && (
            <FormSuccess message={success} setSuccess={setSuccess} />
          )}
        </div>
        {/* Error validation */}
        <div>
          {(errors?.title || errors?.category) && (
            <Alert color="failure">
              <p>{errors?.title?.message}</p>
              <p>{errors?.category?.message}</p>
            </Alert>
          )}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          {/* Title */}
          <TextInput
            type="text"
            placeholder="Title"
            id="title"
            className="flex-1"
            {...register("title")}
          />
          {/* Category */}
          <Select id="category" {...register("category")}>
            <option value="">Seleccione una categoría</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Cargar imagen"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        {/* {Editor} */}
        <div style={{ width: 745, height: 288, marginBottom: 60 }}>
          <div ref={quillRef} />
        </div>
        <Button type="submit" gradientDuoTone="purpleToPink">
          {isLoadingPost ? (
            <div className="">
              <Spinner color="purple" aria-label="Spinner button" size="sm" />
              <span className="pl-3">Cargando...</span>
            </div>
          ) : (
            "Publicar"
          )}
        </Button>
      </form>
    </div>
  );
};

export default RegisterPost;
