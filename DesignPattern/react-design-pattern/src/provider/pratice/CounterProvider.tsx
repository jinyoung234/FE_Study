import React from "react";

interface CounterProviderProps {
  children: React.ReactNode;
}

export const CounterContext = React.createContext({
  count: 0,
  handleSetCount: (e: React.ChangeEvent<HTMLInputElement>) => {},
});

function CounterProvider({ children }: CounterProviderProps) {
  const [count, setCount] = React.useState(0);
  const handleSetCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(+e.currentTarget.value);
  };
  return (
    <CounterContext.Provider value={{ count, handleSetCount }}>
      {children}
    </CounterContext.Provider>
  );
}

export default CounterProvider;
