import { useState } from "react";
const useInput = (validateValue) => {
  const [value, setValue] = useState("");

  const isValid = validateValue(value);

  const inputHandler = (e) => {
    setValue(e.target.value);
  };
  const resetHandler = () => {
    setValue("");
  };

  return {
    value,
    inputHandler,
    isValid,
    resetHandler
    
  };
};
export default useInput;
