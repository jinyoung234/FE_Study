# 문제

조건 `C`, 참일 때 반환하는 타입 `T`, 거짓일 때 반환하는 타입 `F`를 받는 타입 `If`를 구현하세요. `C`는 `true` 또는 `false`이고, `T`와 `F`는 아무 타입입니다.

예시:

```ts
type A = If<true, 'a', 'b'>; // expected to be 'a'
type B = If<false, 'a', 'b'>; // expected to be 'b'
```

# 정답 및 풀이 과정

## 답

```ts
type If<C extends boolean, T, F> = C extends true ? T : F;
```

## 풀이 과정

1. 우선 C가 boolean 타입만 올 수 있도록 타입을 좁힌다.
2. C가 true라면 T를 아니라면 F를 반환한다.

# 어려웠던 점 & 알게 된 점

# 새롭게 알게 된 내용
