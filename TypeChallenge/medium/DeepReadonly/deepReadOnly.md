# 문제

객체의 프로퍼티와 모든 하위 객체를 재귀적으로 읽기 전용으로 설정하는 제네릭 `DeepReadonly<T>`를 구현하세요.

이 챌린지에서는 타입 파라미터 `T`를 객체 타입으로 제한하고 있습니다. 객체뿐만 아니라 배열, 함수, 클래스 등 가능한 다양한 형태의 타입 파라미터를 사용하도록 도전해 보세요.

예시:

```ts
type X = {
  x: {
    a: 1;
    b: 'hi';
  };
  y: 'hey';
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: 'hi';
  };
  readonly y: 'hey';
};

type Todo = DeepReadonly<X>; // should be same as `Expected`
```

# 정답 및 풀이 과정

## 답

```ts
// 나의 답
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends unknown[] | Record<string, unknown>
    ? DeepReadonly<T[P]>
    : T[P];
};

// 또 다른 답 1
type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
};

// 또 다른 답 2
type DeepReadonly<T> = keyof T extends never ? T : { readonly [k in keyof T]: DeepReadonly<T[k]> };
```

## 풀이 과정

1. mapped type을 통해 T의 key를 순회 한다.
2. T[P]가 기본 타입(예: string, number, boolean 등) 또는 함수일 때 T[P]를 반환하고, 아니라면 재귀를 통해 key를 가진 객체가 아닐 때 까지 중첩해서 readonly를 적용시킨다.

# 어려웠던 점 & 알게 된 점

초반에 내가 적은 답은 중첩된 키의 값이 배열이나 객체일 때만 해당되는데, 이럴 경우 Date, Map, Set의 경우엔 readonly를 적용하지 못한다.

그렇기 때문에 keyof (T[P] or T) extends never인지 확인해야 한다.

# 새롭게 알게 된 내용
