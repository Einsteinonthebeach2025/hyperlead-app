"use client";
import { setToggle } from "app/features/modalSlice";
import { useDispatch, useSelector } from "react-redux";

export const useToggle = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  const toggleState = () => {
    dispatch(setToggle(!isOpen));
  };

  return {
    isOpen,
    toggle: toggleState,
  };
};
