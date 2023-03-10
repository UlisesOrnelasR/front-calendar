import { useDispatch, useSelector } from "react-redux";
import { onOpenDateModal, onCloseDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((state) => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  const toggleDateModal = () => {
    if (isDateModalOpen) {
      dispatch(onCloseDateModal());
    } else {
      dispatch(onOpenDateModal());
    }
  };

  return {
    // Propiedades
    isDateModalOpen,
    // Métodos
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
