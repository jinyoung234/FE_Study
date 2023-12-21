# 문제

내장 제네릭 `Parameters<T>`를 이를 사용하지 않고 구현하세요.

예시:

```ts
const foo = (arg1: string, arg2: number): void => {};

type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]
```

# 정답 및 풀이 과정

## 답

```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer U) => any
  ? U
  : never;
```

## 풀이 과정

1. T가 만약 함수 시그니쳐 타입이라면 infer 키워드를 사용하여 U가 ...args의 타입을 따르도록 한다.
2. 아니라면 never를 반환한다.

# 어려웠던 점 & 알게 된 점

# 새롭게 알게 된 내용
