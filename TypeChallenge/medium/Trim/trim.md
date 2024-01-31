# 문제

정확한 문자열 타입이고 양쪽 끝의 공백이 제거된 새 문자열을 반환하는 `Trim<T>`를 구현하십시오.

예시

```ts
type trimmed = Trim<'  Hello World  '>; // 기대되는 결과는 'Hello World'입니다.
```

# 정답 및 풀이 과정

## 답

```ts
type Space = '\t' | '\n' | ' ';

type Trim<S extends string> = S extends `${Space}${infer R}` | `${infer R}${Space}` ? Trim<R> : S;
```

## 풀이 과정

TrimLeft과 TrimRight 내 조건부 타입에서 확인하는 로직을 유니온 타입으로 해서 확인 후 동일한 로직을 적용하면 Trim을 적용할 수 있다.

# 어려웠던 점 & 알게 된 점
