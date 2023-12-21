# 문제

JavaScript의 `Array.concat` 함수를 타입 시스템에서 구현하세요. 타입은 두 인수를 받고, 인수를 왼쪽부터 concat한 새로운 배열을 반환해야 합니다.

예시:

```ts
type Result = Concat<[1], [2]>; // expected to be [1, 2]
```

# 정답 및 풀이 과정

## 답

```ts
type Concat<T extends ReadonlyArray<unknown>, U extends ReadonlyArray<unknown>> = [...T, ...U];
```

## 풀이 과정

1. T와 U를 readonly 형태의 array를 받도록 한다.
2. spread operator를 통해 T와 U를 하나의 배열 내 존재하도록 한다.

# 어려웠던 점 & 알게 된 점

# 새롭게 알게 된 내용
