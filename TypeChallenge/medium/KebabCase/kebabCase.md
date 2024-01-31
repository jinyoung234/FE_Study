# 문제

`camelCase`나 `PascalCase`를 `kebab-case` 문자열로 수정하세요.

`FooBarBaz` -> `foo-bar-baz`

예시:

```ts
type FooBarBaz = KebabCase<'FooBarBaz'>;
const foobarbaz: FooBarBaz = 'foo-bar-baz';

type DoNothing = KebabCase<'do-nothing'>;
const doNothing: DoNothing = 'do-nothing';
```

# 정답 및 풀이 과정

## 답

```ts
type KebabCase<S> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S;
```

# 어려웠던 점 & 알게 된 점

```ts
type KebabCase<S extends string, V extends string = ''> = S extends ''
  ? V
  : S extends `${infer First}${infer Second}${infer Rest}`
  ? Second extends Uppercase<Second>
    ? KebabCase<Rest, `${V}${First}-${Lowercase<Second>}`>
    : First extends Uppercase<First>
    ? KebabCase<Rest, `${V}${Lowercase<First>}${Second}`>
    : KebabCase<Rest, `${V}${First}${Second}`>
  : `${V}${S}`;
```

문제에서 가장 집중했던 부분은 2가지 였다.

1. 첫 번째 문자열이 대문자 인지 여부
2. 두 번째 문자열이 대문자 인지 여부

첫 번째 문자열이 대문자인지 확인하는 이유는 'FooBar'가 있을 때 F를 소문자로 바꿔주려고 했기 때문이다.

또한 두 번째 문자열이 대문자인지 확인하는 이유는 S가 'oBar'일 때, 2번째 문자열인 B는 대문자 이므로, -와 함께 B를 소문자로 바꿔줘야 했기 때문이다.

이러한 이유를 통해 위와 같은 로직을 구성했음을 알 수 있다.

하지만, 로직 내 가장 문제점은 만약 S가 문자열이 2개거나, 1개일 경우 였다.

이 case 들을 대응을 도저히 어떻게 해야할지 모르겠어서 그냥 S와 V를 합친 형태를 반환하도록 했는데 여기서 완전히 막혀버렸다.

해결 방법은 Uncapitalize를 사용하여 첫 번째 문자열이 대문자인지 신경 조차 쓰지 않아도 되는 것이다.

```ts
type KebabCase<S> = S extends `${infer S1}${infer S2}` ? never : S;
```

첫 번째 문자인 S1과 나머지 문자인 S2로 나눠 S가 위 조건을 만족하지 않으면 S는 하나의 문자열만 남은 상태이므로 S 그대로를 반환하게 한다.

```ts
type KebabCase<S> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : never
  : S;
```

S가 위 조건을 만족하면, 나머지 문자인 S2의 첫 번째 문자가 소문자인지 확인한다.
소문자라면 S2를 재귀 호출 한 형태를 반환한다.

```ts
type KebabCase<S> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S;
```

만약 S2의 첫 번째 문자가 대문자라면 -를 붙여줘야 하므로 - + S2를 재귀 호출 한 형태를 반환한다.
