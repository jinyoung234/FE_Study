## HOC 패턴

### HOC

> high order component의 약자로 컴포넌트 로직을 재사용하기 위한 React의 고급 기술

고차 컴포넌트란 다른 컴포넌트를 받는 컴포넌트를 뜻한다.

HOC는 인자로 넘긴 컴포넌트에게 추가되길 원하는 로직을 가지고 있으며 로직이 적용된 엘리먼트를 반환하게 된다.

프론트 엔드에서 컴포넌트는 주로 재사용을 통해 유지보수 및 쉬운 UI 개발을 할 수 있도록 도와주는 역할을 지닌다.

재사용 한다는 뜻은 비슷한 형태(뷰, 비즈니스 로직)가 반복되는 구조를 의미하는데, 반복된 형태의 구조를 하나로 통합 후 재사용함으로써 많은 장점을 가지게 되는 것이다.

### 구현

```tsx
import React from "react";

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
```

여기 라벨, 인풋, 클릭 버튼이 있는 페이지가 있다고 가정해보자. 이런 구조의 컴포넌트는 얼마든지 더 생길 수 있다.
ex) 로그인 페이지, 회원가입 페이지, 추가 정보 입력 페이지 등

이런 비슷한 구조의 페이지들을 계속해서 만들다 보면 굉장히 피로도 높은 개발을 진행하게 될 것이다.
하지만 HOC 패턴을 통해 이런 피로도를 줄일 수 있으며 동일한 로직을 하나의 HOC로 통합하여 동등한 결과물을 만들어 낼 수 있도록 도와준다.

<b>반복되는 로직</b>

> 1. input에 결합할 value를 state로 선언
> 2. onChange 함수를 통해 유저가 입력한 값을 state에 변경
> 3. button 클릭 함수

```tsx
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
```

HOC의 매개변수로는 컴포넌트(반복되는 형태의 컴포넌트)를 받게 된다.

첫 번째 리턴의 매개변수로는 반복되는 컴포넌트가 받을 props를 뜻한다. 그리고 반복되는 로직을 해당 컴포넌트에 구현 후
Element(반복되는 컴포넌트)에 props로 내려줌으로써 로직을 제공하는 형태로 리턴하게 된다.

```tsx
import React from "react";
import withInputPage from "../withInputPage";

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
```

wrapper 컴포넌트는 export default 옆에 HOC(wrapper component name)의 형태로 HOC를 호출하게 된다.

그리고 HOC가 보내준 데이터를 wrapper 컴포넌트 매개변수에 포함 시킨 후 사용하는 식(props.handleClcik, props.handleChangeText)으로
구현을 할 수 있었다.

### Hooks

몇몇 상황에서 HOC 패턴은 React의 훅으로 대체할 수 있다.

withInputPage HOC를 useInput으로 대체할 수 있다.

```tsx
export default function useInput() {
  const [text, setText] = React.useState("");
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };
  const handleClick = () => {
    console.log(text);
  };
  return {
    handleChangeText,
    handleClick,
  };
}

function SignUpPage() {
  const { handleChangeText, handleClick } = useInput();
  return (
    <div>
      <label htmlFor="id">id</label>
      <input onChange={(e) => handleChangeText(e)} id="id" />
      <button onClick={handleClick}>클릭</button>
    </div>
  );
}

export default SignUpPage;
```

```tsx
<withAuth>
  <withLayout>
    <withLogging>
      <Component />
    </withLogging>
  </withLayout>
</withAuth>
```

HOC 대신 Hooks를 통해 더 이상 React의 트리가 깊어지는 상황을 줄여줄 수도 있다.
훅은 내부에서 특정한 동작을 추가할 수 있게 하지만 HOC에 비해 버그를 발생시킬 확률을 증가 시킨다.

### HOC의 사용 사례

> - 앱 전반적으로 동일하며 커스터마이징 불가한 동작이 여러 컴포넌트에 필요한 경우
> - 컴포넌트가 커스텀 로직 추가 없이 단독으로 동작할 수 있어야 하는 경우

### Hooks의 사용 사례

> - 공통 기능이 각 컴포넌트에서 쓰이기 전에 커스터마이징 되어야 하는 경우
> - 공통 기능이 앱 전반적으로 쓰이는 것이 아닌 하나나 혹은 몇개의 컴포넌트에서 요구되는 경우
> - 해당 기능이 기능을 쓰는 컴포넌트에게 여러 프로퍼티를 전달해야하는 경우

### 장점

> - 한 곳에 구현 로직들을 여러 컴포넌트에서 재 사용할 수 있다.
> - 동일 구현을 여러군데에 직접 구현하며 버그를 만들어낼 확률을 줄일 수 있다.
> - 로직을 한 곳에서 관리하여 관심사의 분리도 적용할 수 있다.

### 단점

> - props의 이름이 겹칠 수 있다.

## 레퍼런스

- [React 공식 문서](https://ko.reactjs.org/docs/higher-order-components.html)
- [patterns](https://patterns-dev-kr.github.io/design-patterns/hoc-pattern/)
- [velog - HOC Patterns](https://velog.io/@dbstjrwnekd/HOC-Patterns)
