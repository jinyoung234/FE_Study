import React from "react";

export default function withInputPage(Element: any) {
  return (props: any) => {
    const [text, setText] = React.useState("");
    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value);
    };
    const handleClick = () => {
      console.log(text);
    };
    return (
      <Element
        handleClick={handleClick}
        handleChangeText={handleChangeText}
        {...props}
      />
    );
  };
}
