## Container-Presenter

---

<div align="center">
  <img
    width="400"
    src="https://miro.medium.com/max/1400/1*BQhFitGX4k1KcjI2V8myNA.png"
  />
</div>

---

> 비즈니스 로직을 수행하는 Container 컴포넌트와 오로지 View 로직만 있는 Presenter로 분리된 패턴


### 장점

---

> 1. 관심사의 분리가 가능하다. (비즈니스 로직 - Container, UI - Presenter)
> 2. 협업 시 충돌 발생 위험이 줄어든다. (스타일 관련 코드는 Presenter에 비즈니스 관련 코드는 Container에 있으니 따로 작업이 가능하다.)
> 3. 기능과 UI가 분리 되기에 구조에 대한 이해가 쉬워진다.
> 4. presentational 컴포넌트는 layout 컴포넌트로 활용하여 반복되는 마크업 작업을 줄여줄 수 있기 때문에 마크업 작업이 편해진다.

### Container Component

---

> - 어떻게 동작하는지, 어떤 로직을 수행하는지와 관련된 컴포넌트
> - markup(dom, style)을 사용하지 않으며 데이터(상태)와 데이터 조작에 대한 함수를 주로 생성
> - 생성 후 propObject를 통해 Presenter에 props로 내려주는 형태
> - side effects를 만들 수 있다.
> - props를 자유롭게 받을 수 있다.

<b>Code</b>

```tsx
// PraticeContainer.tsx

import React from "react";
import { PraticeProps } from "./Pratice.type";
import PraticePresenter from "./PraticePresenter";

function PraticeContainer() {
  const [num, setNum] = React.useState(0);
  const handleIncreaseNum = () => {
    setNum((prev) => prev + 1);
  };
  const propObject: PraticeProps = {
    num,
    handleIncreaseNum,
  };
  return <PraticePresenter {...propObject} />;
}
export default PraticeContainer;
```

계산기를 예제로 들어서 설명하면 Container에는 0부터 시작하는 number type의 num과
값이 1씩 증가하는 handleIncreaseNum로 구성되어있다.

propObject와 구조분해할당을 통해 num과 handleIncreaseNum을 Presenter로 내려준다.

```ts
// Pratice.type.ts
interface PraticeProps {
  num: number;
  handleIncreaseNum: () => void;
}

export type { PraticeProps };
```

typescript와도 궁합이 좋기 때문에 내려주는 props의 타입에 대해 다음과 같이 설정했다.

### Presenter Component

---

> - html, css(css in js)만 적용 해야 한다.
> - app에 대해 완전히 몰라야 한다.
> - 상태를 가질 수는 있지만 UI와 관련된 상태만 가질 수 있다. (ex) modal on/off)
> - 필요 시 visual을 바꾸는 props를 받을 수 있어야 한다.

<b>Code</b>

```tsx
import React from "react";
import { PraticeProps } from "./Pratice.type";

function PraticePresenter({ num, handleIncreaseNum }: PraticeProps) {
  return (
    <div>
      <span>{num}</span>
      <button onClick={handleIncreaseNum}>+</button>
    </div>
  );
}

export default PraticePresenter;
```

Presenter 컴포넌트에는 받은 props들을 바인딩 하면 끝이다.

이 때, 주의해야할 점은 Presenter에서는 어떠한 데이터도 이 곳에 정의되면 안되며 Container가 내려주는 데이터를 바인딩해야한다는 것이다.

### presenter와 container를 나누는 기준

---

Presenter 컴포넌트는 stateless한 경향이 있으며 Container 컴포넌트는 stateful한 경향이 있다.

### 레퍼런스

- [container-presenter 패턴](https://javascriptpatterns.vercel.app/patterns/react-patterns/conpres)
- [container-presenter 정리](https://tecoble.techcourse.co.kr/post/2021-04-26-presentational-and-container/)
