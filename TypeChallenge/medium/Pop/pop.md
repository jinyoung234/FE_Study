# 문제

> 이 챌린지에는 TypeScript 4.0 사용이 권장됩니다.

배열 `T`를 사용해 마지막 요소를 제외한 배열을 반환하는 제네릭 `Pop<T>`를 구현합니다.

예시

```ts
type arr1 = ['a', 'b', 'c', 'd'];
type arr2 = [3, 2, 1];

type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2>; // expected to be [3, 2]
```

**더보기**: 비슷하게 `Shift`, `Push` 그리고 `Unshift`도 구현할 수 있을까요?

# 정답 및 풀이 과정

## 답

```ts
type Pop<T extends any[]> = T extends [...infer Rest, unknown] ? [...Rest] : never;
type Unshift<T extends any[]> = T extends [unknown, ...infer Rest] ? [...Rest] : never;
type Push<T extends any[], K> = [...T, K];
type Shift<T extends any[], K> = [K, ...T];
```

## 풀이 과정

# 어려웠던 점 & 알게 된 점
