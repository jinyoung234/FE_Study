import React from "react";
import { CounterContext } from "./CounterProvider";
import Input from "./Input";

function Counter() {
  const { count, handleSetCount } = React.useContext(CounterContext);
  return <Input count={count} handleSetCount={handleSetCount} />;
}

export default Counter;
