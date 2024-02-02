import { useEffect, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const FormSuccess = ({ message, setSuccess }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) setVisible(false);
    else setVisible(true);
  }, [message, visible]);

  return visible ? (
    <Alert
      color="success"
      onDismiss={() => {
        setSuccess("");
        setVisible(!visible);
      }}
      icon={HiCheckCircle}
    >
      {message}
    </Alert>
  ) : null;
};

export default FormSuccess;
