"use client";
import { selectIsModalOpen, toggleModal } from "app/features/modalSlice";
import { useDispatch, useSelector } from "react-redux";

export const useToggle = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);

  const toggleState = () => {
    dispatch(toggleModal());
  };

  return {
    isModalOpen,
    toggle: toggleState,
  };
};
