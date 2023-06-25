import React from "react";
import withInputPage from "../withInputPage";
import { PageProps } from "./SignUpPage";

// HOC 적용 후 컴포넌트
function LoginPage({ ...props }: PageProps) {
  return (
    <div>
      <label htmlFor="id">id</label>
      <input onChange={(e) => props.handleChangeText(e)} id="id" />
      <button onClick={props.handleClick}>클릭</button>
    </div>
  );
}

export default withInputPage(LoginPage);
