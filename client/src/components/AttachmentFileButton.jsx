import { useDispatch, useSelector } from "react-redux";
import { useUploadProgressMutation } from "../redux/services/auth/authApi";
import { Progress } from "flowbite-react";
import { setUploadProgress } from "../redux/features/auth/authSlice";

const AttachmentFileButton = () => {
  const dispatch = useDispatch();

  const { uploadProgress } = useSelector((state) => state.auth);

  const [uploadFile, { isLoading: isLoadingUpload }] =
    useUploadProgressMutation();

  const handleAttachFilesInput = async (e) => {
    e.preventDefault();
    dispatch(setUploadProgress(0));
    const files = [...e.target.files];
    const data = new FormData();
    for (const file of files) {
      data.append("image", file);
    }

    const resp = await uploadFile({
      url: "http://localhost:4000/api/auth/upload",
      data,
    }).unwrap();
    if (resp?.success) {
      console.log(resp);
    }
  };

  return (
    <div className="flex flex-col p-20 gap-3">
      <label className="flex gap-2 py-2 px-4 cursor-pointer border rounded-md items-center">
        <span className={isLoadingUpload ? "text-gray-300" : "text-gray-600"}>
          {isLoadingUpload ? "Cargando..." : "Adjuntar archivos"}
        </span>
        <input
          onChange={handleAttachFilesInput}
          type="file"
          className="hidden"
          name="image"
        />
      </label>
      <Progress progress={uploadProgress} size="lg" labelProgress />
    </div>
  );
};

export default AttachmentFileButton;
