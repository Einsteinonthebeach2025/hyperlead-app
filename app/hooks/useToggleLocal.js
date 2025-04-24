"use client";
import { useState } from "react";

export const useToggleLocal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleState = (index) => {
    setIsOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  return {
    isOpen,
    setIsOpen,
    toggleState,
  };
};
