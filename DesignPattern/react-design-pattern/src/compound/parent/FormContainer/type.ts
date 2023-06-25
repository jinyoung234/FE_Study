import { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}

export type { FormContainerProps };
