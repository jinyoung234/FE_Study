# 문제

두개의 타입을 새로운 타입으로 병합하세요.
두번째 타입의 Key가 첫번째 타입을 덮어씁니다(재정의합니다)

예시:

```ts
type foo = {
  name: string;
  age: string;
};
type coo = {
  age: number;
  sex: string;
};

type Result = Merge<foo, coo>; // expected to be {name: string, age: number, sex: string}
```

# 정답 및 풀이 과정

## 답

```ts
type Merge<F, S> = {
  [P in keyof (F & S)]: P extends keyof (F | S) ? S[P] : (F & S)[P];
};
```

# 어려웠던 점 & 알게 된 점

keyof (F & S)를 하게 되면 F와 S의 모든 key 들이 나오게 된다.

즉, P는 mapped type 특성으로 인해 F와 S의 key 전부 순회하게 된다.

또한, keyof (F | S)를 하면 F와 S의 공통 속성이 나오기 때문에 만약 공통 속성이라면 S의 값 아니라면 (F & S)의 값을 접근하면 답을 도출 할 수 있다.
