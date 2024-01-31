# 문제

input type으로 T를 받는 IsNever type을 구현하세요. 만약 T의 유형이 never으로 확인되면 true를 반환하고 아니면 false를 반환합니다

예시:

```ts
type A = IsNever<never>; // expected to be true
type B = IsNever<undefined>; // expected to be false
type C = IsNever<null>; // expected to be false
type D = IsNever<[]>; // expected to be false
type E = IsNever<number>; // expected to be false
```

# 정답 및 풀이 과정

## 답

```ts
type IsNever<T> = [T] extends [never] ? true : false;
```

# 어려웠던 점 & 알게 된 점

never 대신 never 튜플을 사용하면 never인지 추론이 가능하다.
