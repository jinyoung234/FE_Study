import React from "react";

// HOC 적용 전 컴포넌트
function SignInPage() {
  const [text, setText] = React.useState("");
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };
  const handleClick = () => {
    console.log(text);
  };
  return (
    <div>
      <label htmlFor="id">id</label>
      <input onChange={(e) => handleChangeText(e)} id="id" />
      <button onClick={handleClick}>클릭</button>
    </div>
  );
}

export default SignInPage;
