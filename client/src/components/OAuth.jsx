import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useGoogleMutation } from "../redux/services/auth/authApi";
import { signInSuccess } from "../redux/features/auth/authSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [google, { data, isLoading, error }] = useGoogleMutation();

  const HandleGoogleClick = async () => {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, googleProvider);
      if (resultsFromGoogle) {
        const resp = await google({
          email: resultsFromGoogle?.user?.email,
          name: resultsFromGoogle?.user?.displayName,
          googlePhotoUrl: resultsFromGoogle?.user?.photoURL,
        }).unwrap();
        if (resp) {
          dispatch(signInSuccess(resp));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={() => HandleGoogleClick()}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continuar con Google
    </Button>
  );
};

export default OAuth;
