## Compound Pattern

> 하나의 컴포넌트를 여러 가지 집합체로 분리 한 후, 분리 된 각 컴포넌트를 사용하는 쪽에서 조합하여 사용하는 컴포넌트 패턴

예시

```tsx
<select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

select box는 1개의 select 컴포넌트와 2개의 option 컴포넌트로 이루어진 합성 컴포넌트이다.

select와 option 모두 독립적으로 있을 땐 아무 기능을 발휘하지 못하지만 합쳐져 select box로 만들어진
경우 화면에 의미있는 요소가 될 수 있다.

### 서브 컴포넌트 구현

```tsx
import React from "react";
import { ButtonProps } from "./type";

function Button({ disabledCondition, context }: ButtonProps) {
  return <button disabled={disabledCondition}>{context}</button>;
}

export default Button;
```

일반적인 컴포넌트의 형태로 구현한다.

만약 Button에 하위 컴포넌트가 들어가는 경우 이렇게도 나타낼 수 있다.

```tsx
interface ButtonProps {
  children: ReactNode;
  disabledCondition: boolean;
}

function Button({ disabledCondition, children }: ButtonProps) {
  return <button disabled={disabledCondition}>{children}</button>;
}
```

children은 react에서 제공하는 prop으로 버튼 컴포넌트에 포함 된 자식 컴포넌트가 모두 children으로 들어오게 된다.

### 부모 컴포넌트 구현

```tsx
import React from "react";
import Button from "../child/Button";
import ErrorText from "../child/ErrorText";
import Input from "../child/Input";
import Label from "../child/Label";
import { FormContainerProps } from "./type";

export const Form = Object.assign(FormContainer, {
  Button,
});

function FormContainer({ children, handleSubmit }: FormContainerProps) {
  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}

export default FormContainer;
```

FormContainer를 통해 들어오는 컴포넌트들에 children prop을 통해 표현할 수 있다.

Object.assign을 통해 부모 컴포넌트와 자식 컴포넌트를 묶어서 export 할 수 있다. 이렇게 할 경우 코드의 가독성이 좀 더 좋아지는 효과가 있다.

### 실제 컴포넌트에 compound 패턴 적용

```tsx
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../parent/FormContainer";

import { IFormData } from "./type";

function SignUpForm() {
  const emailRegex = new RegExp(/\w+@\w+\.\w+/);
  const { watch, handleSubmit } = useForm<IFormData>();
  const onValid = (data: IFormData) => {
    console.log(data);
  };
  return (
    <>
      <Form handleSubmit={handleSubmit(onValid)}>
        <Form.Button
          context="등록"
          disabledCondition={
            !(emailRegex.test(watch().id) && watch().pw.length >= 8)
          }
        />
      </Form>
    </>
  );
}

export default SignUpForm;
```

signUpForm에는 Form과 Button이 2개의 컴포넌트로 구성 된 구조인 것을 쉽게 파악할 수 있다.

compound 패턴을 통해 코드의 가독성을 높이고 컴포넌트의 구조를 더 명확히 할 수 있다는 장점이 존재한다.

### 장점

#### 유연한 마크업 구조

하나의 컴포넌트로 부터 다양한 케이스를 생성할 수 있다.

<div align="center">
  <img
    width="400"
    src="https://blog.wishket.com/wp-content/uploads/2022/06/04-1.jpg"
  />
</div>

그림을 보게 되면 카운터가 있는데, 하나의 카운터 컴포넌트를 만들어도 다른 하위 컴포넌트의 위치를 어떻게 하느냐에 따라 다른 컴포넌트를 생성할 수 있다.

이로 인해 요구사항이 달라져 컴포넌트의 형태가 조금씩 달라지는 것에 대해서도 유연하게 대응할 수 있다.

#### 관심사의 분리

대부분의 로직은 compound 패턴을 적용한 최상위 컴포넌트에 포함 되며, 리액트의 Context API를 통해 모든 자식 컴포넌트들의 상태와 핸들러 함수들을
공유하는데 사용될 수 있다.

그로 인해, 책임 소재를 명확히 분리 할 수 있다.

책임 소재가 명확해 지기 때문에, 문제가 발생할 때 어떤 컴포넌트에서 발생하였는지 확인과 그에 따른 대응이 빠르게 이뤄질 수 있다. 즉, 유지보수가 쉬워지게 되는 것이다.

#### API 복잡성 감소

<div align="center">
  <img
    width="400"
    src="https://blog.wishket.com/wp-content/uploads/2022/06/03-1.jpg"
  />
</div>

한 컴포넌트에 집중된 props들을 분리할 수 있을 뿐 아니라, 각 컴포넌트에 맞는 props들을 확인할 수 있으며
컴포넌트들의 대한 구조를 명확히 할 수 있다.

### 아쉬운 점

context API를 통해 관심사의 분리를 좀 더 명확히 하고싶었는데, react-hook-form으로 관리되고 있는 register 함수에서 받은 값들을 어떻게 관리해야할지 도무지 감이 잡히지 않아
context API를 통한 과정을 생략하게 되었다.

이번 패턴이 특히나 개념을 명확히 파악하는 것 뿐 아니라 패턴을 적용하는 것도 시간이 많이 걸렸기 때문에 좀 더 공부를 한 후 적용하여 수정해 봐야 겠다는 다짐을 하게 되었다.

### 레퍼런스

- [카카오 기술 블로그](https://fe-developers.kakaoent.com/2022/220731-composition-component/)
- [위시캣 기술 블로그](https://blog.wishket.com/5%EA%B0%80%EC%A7%80-%EC%B5%9C%EC%8B%A0-%EA%B3%A0%EA%B8%89-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%8C%A8%ED%84%B4-%E2%91%A0-compound-component-control-props-custom-hook/)
