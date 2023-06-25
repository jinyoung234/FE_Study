import React from "react";

interface InputProps {
  count: number;
  handleSetCount: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ count, handleSetCount }: InputProps) {
  return <input value={count} onChange={(e) => handleSetCount(e)} />;
}

export default Input;
