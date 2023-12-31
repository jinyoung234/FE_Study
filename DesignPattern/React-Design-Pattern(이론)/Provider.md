## Provider 패턴

### 정의

<div align="center">
  <img
    width="800"
    src="https://user-images.githubusercontent.com/87177577/212471923-52124ca4-f264-46c0-8580-967368b9269b.png"
  />
</div>

> Props drilling에 의존하지 않고 직접 접근하기 위해 Context 객체를 이용하여 각 레이어에 직접 데이터를 주지 않고도 여러 컴포넌트들에게 데이터에 접근하도록 하기 위한 기법

이 패턴을 짚고 넘어가기 전 리액트는 단방향 바인딩만 지원한다. 그렇기 때문에 부모 - 자식 간의 수직적인 관계만 형성 되며 자식 - 자식, 자식 - 부모 간 데이터 전달은 리액트에서 불가능하다.

Props drilling은 이러한 리액트 구조의 대표적인 안티 패턴이다.

### Props drilling

<div align="center">
  <img
    width="800"
    src="https://user-images.githubusercontent.com/87177577/212472173-0f3ad124-d703-4af3-adb9-20c1abf784d6.png"
  />
</div>

예시로 카운터 앱을 만들어 보았다.

Input에 사용자가 값을 입력하면 현재 값을 출력하는 기능을 수행한다.

```tsx
// Provider.tsx
import React from "react";
import Description from "./pratice/Description";
import Counter from "./pratice/Counter";

function Provider() {
  const [count, setCount] = React.useState(0);
  const handleSetCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(+e.currentTarget.value);
  };
  return (
    <>
      <Counter count={count} handleSetCount={handleSetCount} />
      <Description count={count} />
    </>
  );
}

export default Provider;
```

컨테이너 컴포넌트로써 프레젠터 컴포넌트인 Counter와 Description에게 데이터를 전달하는 역할을 수행한다.

```tsx
import React from "react";
import Input from "./Input";

export interface CounterProps {
  count: number;
  handleSetCount: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Counter({ count, handleSetCount }: CounterProps) {
  return <Input count={count} handleSetCount={handleSetCount} />;
}

export default Counter;
```

Counter는 Input에게 데이터만 전달하는 프레젠터 컴포넌트이다. Container-Presenter 패턴의 대표적인 단점이라고 볼 수 있는 컴포넌트이다.

Counter는 정확히 말하면 이 데이터들이 모두 필요없다. 왜냐하면 Input에 데이터만 내려주는 컴포넌트 이며 데이터를 사용하지 않기 때문이다.

즉, Provider 컴포넌트에서 데이터를 내려줄 필요가 없다는 의미이다.

지금은 기능이 거의 없기 때문에 크게 상관이 없을 수 있다.

<div align="center">
  <img
    width="800"
    src="https://user-images.githubusercontent.com/87177577/212472354-7b8e0484-eb7b-437f-b652-fff8e334463b.png"
  />
</div>

하지만 앱이 복잡해지고 내려줄 데이터들이 많아진다면, 만약 변수명이 변경되는 함수가 있다고 하면 props로 전달 받는 수 많은
컴포넌트들의 변수명을 모두 변경해야 할 것이며 엄청나게 복잡해 질 것이다.

### Provider Pattern으로 리팩토링

```tsx
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
```

Provider 컴포넌트를 감쌀 CounterProvider 컴포넌트를 만들었다. React가 제공하는 children 예약어를 통해 CounterProvider의 자식 객체들을 가져올 수 있다.
createContext를 통해 context 객체를 만든 후 초기값으로 CounterProvider가 사용하는 값들을 설정해준다.(의미 없는 더미 데이터라고 보면 된다.)

그 후 Counter 앱에서 사용하는 상태와 핸들러 함수를 CounterProvider로 끌어와 선언 후 CounterContext.Provider의 value 프롭으로 추가해준다.
이렇게 할 경우 Context API의 특성으로 인해 CounterContext의 자식으로 있는 모든 컴포넌트들은 CounterContext가 value prop에 저장한 데이터를 사용할 수 있게 된다.

```tsx
function Provider() {
  return (
    <CounterProvider>
      <Counter />
      <Description />
    </CounterProvider>
  );
}
```

이제 더 이상 Provider 컴포넌트는 Counter와 Description 컴포넌트에게 데이터를 내려주지 않는다.
왜냐하면 CounterProvider에서 저장한 데이터를 이제 Counter와 Description에서 데이터를 끌어올 것이기 때문이다.

```tsx
import React from "react";
import { CounterContext } from "../CounterProvider";
import Input from "./Input";

function Counter() {
  const { count, handleSetCount } = React.useContext(CounterContext);
  return <Input count={count} handleSetCount={handleSetCount} />;
}

export default Counter;
```

Counter 컴포넌트는 더 이상 Provider로 부터 데이터를 받지 않는다. useContext를 통해 CounterProvider에 저장해 놓은 value prop을 꺼내어 쓸 수 있다.
만약 count나 handleSetCount가 변경되어도 이 데이터를 사용하지 않는 Counter는 useContext 내 변수명만 수정하면 그만이다.

TypeScript를 사용한다면 더 이상 Counter에 불필요한 인터페이스를 추가하지 않아도 된다.

### 장점

> 1. 컴포넌트 트리의 각 노드에 데이터를 전달하지 않아도 다수의 컴포넌트에 데이터 전달이 가능하다.
> 2. 리팩토링 과정에서 개발자가 실수할 확률을 줄여준다.(prop의 이름을 변경하기 위해 모든 컴포넌트를 찾아다니며 코드 수정할 필요가 없어졌기 때문이다.)
> 3. prop-drilling을 하지 않아도 된다.(provider 패턴을 통해 데이터가 필요없는 컴포넌트에 불필요한 prop을 받을 필요가 없어졌다.)

### 단점

> 1. Provider 패턴을 과하게 사용하면 특정 상황에서 성능 이슈 발생이 가능하다.(Context를 참조하는 모든 컴포넌트는 컨텍스트 변경마다 모두 리렌더링된다.)

### 레퍼런스

- [Provider 패턴](https://patterns-dev-kr.github.io/design-patterns/provider-pattern/)
