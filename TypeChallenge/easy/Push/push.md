# 문제

`Array.push`의 제네릭 버전을 구현하세요.

예시:

```typescript
type Result = Push<[1, 2], '3'>; // [1, 2, '3']
```

# 정답 및 풀이 과정

## 답

```ts
type Push<T extends unknown[], U> = [...T, U];
```

## 풀이 과정

1. T는 항상 배열 타입이 오도록 한다.
2. T를 spread operator를 활용 하여 앞에 배치 한 후, U를 마지막 요소에 배치 시킨다.

# 어려웠던 점 & 알게 된 점

# 새롭게 알게 된 내용
