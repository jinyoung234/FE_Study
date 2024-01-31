# 문제

정확한 문자열 타입이고 시작 부분의 공백이 제거된 새 문자열을 반환하는 `TrimLeft<T>`를 구현하십시오.

예시

```ts
type trimed = TrimLeft<'  Hello World  '>; // 기대되는 결과는 'Hello World  '입니다.
```

# 정답 및 풀이 과정

## 답

```ts
type Space = '\t' | '\n' | ' ';

type TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R> : S;
```

## 풀이 과정

1. 공백에 관련된 문자 들을 Space 라는 Type으로 만든다.
2. S가 만약 저 공백 문자들 중 하나와 함께 특정 문자가 포함되어 있다면 재귀적으로 `TrimLeft<R>`로 아니면 S를 반환한다.

# 어려웠던 점 & 알게 된 점

`어떻게 공백을 조건부 타입으로 확인할 수 있을까?`에 대한 의문이 계속 지워지지 않아서 해결하기 어려웠던 문제였다.

다만 타입스크립트에선 template literal 타입과 infer 키워드를 통해 해결할 수 있었다.

```ts
TrimLeft<' str'>;
```

위 타입을 예시로 들면 처음에 조건부 타입으로 확인할 때 S(' str')는 `${Space}${infer R}`에 해당하기 때문에 infer로 추론되는 R은 공백 문자를 제외한 'str'이 된다.

그 후 TrimLeft<'str'>로 반환된다.

TrimLeft<'str'>에서 S는 'str'이 되고, str은 공백문자가 없기 때문에 조건부 타입을 만족하지 않아 'str' 그대로를 반환하게 되고 이게 최종 반환 타입이 된다.
