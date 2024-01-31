# 문제

튜플 값으로 유니온 타입을 생성하는 제네릭 `TupleToUnion<T>`를 구현하세요.

예시:

```ts
type Arr = ['1', '2', '3'];

type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'
```

# 정답 및 풀이 과정

## 답

```ts
// 나의 답
type TupleToUnion<T extends unknown[]> = T[number];

// 또 다른 답
export type TupleToUnion<T> = T extends Array<infer ITEMS> ? ITEMS : never;
```

## 풀이 과정

1. <T extends unknown[]>를 통해 T를 배열 타입으로 고정 시킨다.
2. T[number]를 통해 배열 내 모든 요소를 유니온 타입으로 만든다.

# 어려웠던 점 & 알게 된 점

# 새롭게 알게 된 내용

- T[number]는 모든 요소를 유니온 타입으로 결합 시킨다. (알고 있었지만 복습 겸 필기)

- T extends Array<infer ITEMS>를 통해 T가 만약 Array 타입이라면 infer ITEMS를 통해 array 내부 요소를 유니온으로 추론할 수 있다.
