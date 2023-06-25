import React from "react";
import { CounterContext } from "./CounterProvider";
import Text from "./Text";

function Description() {
  const { count } = React.useContext(CounterContext);
  return <Text count={count} />;
}

export default Description;
