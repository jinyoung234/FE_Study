import React from "react";
import { RefCallBack } from "react-hook-form";

function useConnect(ref: RefCallBack) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const connectRef = (e: HTMLInputElement) => {
    ref(e);
    inputRef.current = e;
  };

  return { inputRef, connectRef };
}

export default useConnect;
