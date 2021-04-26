import { useContext } from "react";
import { ConfirmContext } from "../context/ConfirmContext";

const useConfirm = () => {
  const context = useContext(ConfirmContext);

  return context;
};

export default useConfirm;