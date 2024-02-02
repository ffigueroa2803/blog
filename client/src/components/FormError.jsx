import { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const FormError = ({ message, setError }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!message) setVisible(false);
    else setVisible(true);
  }, [message, visible]);

  return visible ? (
    <Alert
      color="failure"
      onDismiss={() => {
        setError("");
        setVisible(!visible);
      }}
      icon={HiInformationCircle}
    >
      {message}
    </Alert>
  ) : null;
};

export default FormError;
