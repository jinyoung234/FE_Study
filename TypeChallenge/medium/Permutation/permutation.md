# 문제

주어진 유니언 타입을 순열 배열로 바꾸는 Permutation 타입을 구현하세요.

```typescript
type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```

# 정답 및 풀이 과정

## 답

```ts
type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation<Exclude<T, K>>]
  : never;
```

# 어려웠던 점 & 알게 된 점
