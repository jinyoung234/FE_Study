# 문제

`Array.unshift`의 타입 버전을 구현하세요.

예시:

```typescript
type Result = Unshift<[1, 2], 0>; // [0, 1, 2,]
```

# 정답 및 풀이 과정

## 답

```ts
type Unshift<T extends unknown[], U> = [U, ...T];
```

## 풀이 과정

1. T는 항상 배열 타입이 오도록 한다.
2. T를 spread operator를 활용 하여 앞에 배치 한 후, U를 첫 요소에 배치 시킨다.

# 어려웠던 점 & 알게 된 점

# 새롭게 알게 된 내용
