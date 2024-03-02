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
type IsUnion<T, U = T> = [T] extends [never]
  ? false
  : T extends U
  ? [Exclude<U, T>] extends [never]
    ? false
    : true
  : false;
```

# 어려웠던 점 & 알게 된 점

T가 never 타입인지 여부는 쉽게 확인(Distribute Conditional Types)이 가능했지만 그 뒤로 로직을 어떻게 전개해야 할지 도저히 알 수 없었다.

```ts
T extends U ?
```

우선 T가 U에 해당하는지 확인한다.

```ts
([Exclude<U, T>] extends [never] ? false : true)
```

해당 된다면 U에서 T를 제외한 타입을 생성 한 후, 해당 타입이 다시 never 타입인지 비교 한다.

만약, 유니온 타입이라면 never 타입이 아니기 때문에 true가 반환되고 그렇지 않다면 never 타입으로 추론되어 false를 반환한다.
