import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";
import Snackbar from "../components/pages/SnakeBar"; // Note: Ensure the file name is correct. It might be Snackbar instead of SnakeBar.

type ToasterContextType = {
  showHideToast: (
    message: string,
    type: "success" | "info" | "warning" | "error"
  ) => void;
};

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

interface ToasterProviderProps {
  children: ReactNode;
}

export const ToasterProvider: FC<ToasterProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success"); // Default type

  const showHideToast = (
    message: string,
    type: "success" | "info" | "warning" | "error"
  ) => {
    setOpen(true);
    setMessage(message);
    setType(type); // Set the alert type
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <ToasterContext.Provider value={{ showHideToast }}>
      <Snackbar open={open} message={message} type={type} />
      {children}
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (context === undefined) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }
  return context;
};
