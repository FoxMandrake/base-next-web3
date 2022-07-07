import { useState } from "react";

export const useLoader = () => {
  const [isLoader, setIsLoader] = useState(false);

  const toggleLoader = () => {
    setIsLoader((current) => !current);
  };

  return {
    isLoader,
    toggleLoader,
  };
};
