# 문제

문자열 인수를 입력받는 String to Union 유형을 구현하세요.
출력은 입력 문자열의 Union type이어야 합니다.

예시:

```ts
type Test = '123';
type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
```

# 정답 및 풀이 과정

## 답

```ts
// 내 답
type StringToUnion<T extends string, K = never> = T extends `${infer F}${infer R}`
  ? StringToUnion<R, K | F>
  : K;

// 또 다른 답
type StringToUnion<T extends string> = T extends `${infer F}${infer R}`
  ? F | StringToUnion<R>
  : never;
```

# 어려웠던 점 & 알게 된 점

내가 작성한 답의 경우 K가 default 값이 never기 때문에 never | string이라면 string이 되는 원리를 활용했다.

```ts
type A = StringToUnion<'hello'>;
```

처음 `T extends `${infer F}${infer R}``를 통해 F가 h가 될테고 `StringToUnion<R, K | F>`에서 K | F는 never | 'h'이기 때문에 h가 된다.

그 후 e, l, l, o까지 유니온 타입으로 만들어진 후 T가 ''이 되기 때문에 최종적으로 K가 반환되어 h | e | l | o 타입이 반환된다.

다른 분들의 답을 살펴보면, 2번째 제네릭 타입을 만들지 않고 T만으로 해결한 것을 알 수 있다.
