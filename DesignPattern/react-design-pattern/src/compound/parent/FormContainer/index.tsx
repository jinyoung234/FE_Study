import React from "react";
import Button from "../../child/Button";
import ErrorText from "../../child/ErrorText";
import Input from "../../child/Input";
import Label from "../../child/Label";
import { FormContainerProps } from "./type";

export const Form = Object.assign(FormContainer, {
  Button,
  ErrorText,
  Input,
  Label,
});

function FormContainer({ children, handleSubmit }: FormContainerProps) {
  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}

export default FormContainer;
