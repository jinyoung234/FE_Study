import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../parent/FormContainer";
import useConnect from "../hooks/useConnect";

import { IFormData } from "./type";

function SignUpForm() {
  const emailRegex = new RegExp(/\w+@\w+\.\w+/);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const { ref: id, ...idRest } = register("id");
  const { ref: pw, ...pwRest } = register("pw");
  const { connectRef: connectIdRef } = useConnect(id);
  const { inputRef: pwRef, connectRef: connectPWRef } = useConnect(pw);
  const onValid = (data: IFormData) => {
    console.log(data);
  };
  return (
    <>
      <Form handleSubmit={handleSubmit(onValid)}>
        <Form.Label label={"ID"} htmlFor="id" />
        <Form.Input
          connectRef={connectIdRef}
          type="text"
          id="id"
          pwRef={pwRef}
          isEnter
          {...idRest}
        />
        {errors && <Form.ErrorText message={errors?.id?.message} />}
        <Form.Label label={"PW"} htmlFor="pw" />
        <Form.Input
          connectRef={connectPWRef}
          type="password"
          id="pw"
          {...pwRest}
        />
        {errors && <Form.ErrorText message={errors?.pw?.message} />}
        <Form.Button
          context="등록"
          disabledCondition={
            !(emailRegex.test(watch().id) && watch().pw.length >= 8)
          }
        />
      </Form>
    </>
  );
}

export default SignUpForm;
