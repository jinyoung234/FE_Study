# 문제

number, string, 혹은 bigint을 받는 `Absolute` 타입을 만드세요.
출력은 양수 문자열이어야 합니다.

예시:

```ts
type Test = -100;
type Result = Absolute<Test>; // expected to be "100"
```

# 정답 및 풀이 과정

## 답

```ts
type AppendToObject<T, U extends string, V> = {
  [P in keyof T | U]: (T & { [K in U]: V })[P];
};
```

# 어려웠던 점 & 알게 된 점
