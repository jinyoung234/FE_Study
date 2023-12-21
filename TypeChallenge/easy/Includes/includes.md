# 문제

JavaScript의 `Array.includes` 함수를 타입 시스템에서 구현하세요. 타입은 두 인수를 받고, `true` 또는 `false`를 반환해야 합니다.

예시:

```ts
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>; // expected to be `false`
```

# 정답 및 풀이 과정

## 답

```ts
type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2
  ? true
  : false;

type Includes<T extends readonly unknown[], U> = T extends [infer First, ...infer Rest]
  ? Equal<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false;
```

## 풀이 과정

1. 만약 T가 First, Rest로 구성된 배열에 포함되는지 확인하여 맞다면 infer를 통해 First와 Rest의 타입을 추론시키고 아니라면 false를 반환한다.
2. First와 U가 서로 동일하다면 true를 반환 한다.
3. 아니라면 재귀 형태로 Include 지네릭에 Rest와 U를 넣어 First 타입을 제외한 나머지 타입과 U를 비교한다. (false or true를 반환할 때까지 1 ~ 3의 과정 반복)
