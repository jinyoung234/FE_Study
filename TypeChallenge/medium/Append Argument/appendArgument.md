# 문제

함수 타입 `Fn`과 어떤 타입 `A`가 주어질 때 `Fn`의 인수와 `A`를 마지막 인수로 받는 `Fn`과 동일한 함수 유형인 `G`를 생성하세요.

예시 :

```typescript
type Fn = (a: number, b: string) => number;

type Result = AppendArgument<Fn, boolean>;
// 기대되는 결과는 (a: number, b: string, x: boolean) => number 입니다.
```

# 정답 및 풀이 과정

## 답

```ts
// 답
type AppendArgument<Fn, A> = Fn extends (...args: infer R) => infer T
  ? (...args: [...R, A]) => T
  : never;

// 유틸리티 타입 활용
type AppendArgument<Fn extends (...args: any) => any, A> = (
  ...args: [...Parameters<Fn>, A]
) => ReturnType<Fn>;
```

# 어려웠던 점 & 알게 된 점

```ts
type AppendArgument<Fn extends (...args: any) => any, A> = Parameters<Fn> extends [infer P, infer V]
  ? (a: P, b: V, x: A) => ReturnType<Fn>
  : Parameters<Fn> extends [infer P]
  ? (a: P, x: A) => ReturnType<Fn>
  : (x: A) => ReturnType<Fn>;
```

처음엔 위와 같은 답을 도출했었다.

Fn의 파라미터 타입을 추론하기 위해 Parameters를 사용하는 것 까진 좋았으나, 매개변수 갯수에 따라 유동적인 파라미터 타입이 만들어지지 않아 파라미터 갯수가 각각 2, 1, 0개 인 경우만 고려해서 답을 작성했었다.

```ts
type AppendArgument<Fn, A> = Fn extends (...args: infer R) => infer T
  ? (...args: [...R, A]) => T
  : never;
```

다음과 같이 파라미터에 가변 튜플 타입과 infer를 적용하여 R의 타입을 유추한 후, `(...args : [...R, A])`와 같은 형태를 적용하면 매개변수 갯수에 따라 유동적인 파라미터 타입을 구성할 수 있었다.

가변 튜플 타입이 생소 할 수 있지만, rest 문법을 타입 시스템에 적용한 거라고 이해하면 된다.

```ts
// 유틸리티 타입 활용
type AppendArgument<Fn extends (...args: any) => any, A> = (
  ...args: [...Parameters<Fn>, A]
) => ReturnType<Fn>;
```

유틸리티 타입인 Parameters와 ReturnType을 적용하면 조건부 타입과 infer 키워드 없이 더 간결하게 작성할 수 있었다.
