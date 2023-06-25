import React from "react";
import withInputPage from "../withInputPage";

// HOC 적용 후 컴포넌트
export interface PageProps {
  [key: string]: any;
  handleChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
}

function SignUpPage({ ...props }: PageProps) {
  return (
    <div>
      <label htmlFor="id">id</label>
      <input onChange={(e) => props.handleChangeText(e)} id="id" />
      <button onClick={props.handleClick}>클릭</button>
    </div>
  );
}

export default withInputPage(SignUpPage);
