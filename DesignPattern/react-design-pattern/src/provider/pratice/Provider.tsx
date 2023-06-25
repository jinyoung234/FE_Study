import React from "react";
import Description from "./Description";
import Counter from "./Counter";
import CounterProvider from "./CounterProvider";

function Provider() {
  return (
    <CounterProvider>
      <Counter />
      <Description />
    </CounterProvider>
  );
}

export default Provider;
