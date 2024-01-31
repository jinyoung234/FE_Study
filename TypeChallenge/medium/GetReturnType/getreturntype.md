# 문제

내장 제네릭 `ReturnType<T>`을 이를 사용하지 않고 구현하세요.

예시:

```ts
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // should be "1 | 2"
```

# 정답 및 풀이 과정

## 답

```ts
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer U
  ? U
  : never;
```

## 풀이 과정

1. MyParameters 타입을 구하는 것과 유사하게 T가 함수 시그니쳐 타입인지 확인한다.
2. 만약 맞다면 반환 값에 infer U를 적용하여 U를 반환하도록 하고 아니라면 never를 반환하도록 한다.

# 어려웠던 점 & 알게 된 점

# 새롭게 알게 된 내용
