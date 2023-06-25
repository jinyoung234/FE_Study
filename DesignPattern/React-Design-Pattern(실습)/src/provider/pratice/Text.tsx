import React from "react";

interface TextProps {
  count: number;
}

function Text({ count }: TextProps) {
  return <div>현재 값은 {count} 입니다.</div>;
}

export default Text;
