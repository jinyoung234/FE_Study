# 문제

문자열의 첫 글자만 대문자로 바꾸고 나머지는 그대로 놔두는 `Capitalize<T>`를 구현하세요.

예시:

```ts
type capitalized = Capitalize<'hello world'>; // expected to be 'Hello world'
```

# 정답 및 풀이 과정

## 답

```ts
// 초기 답
type AlphabetTable = {
  a: 'A';
  b: 'B';
  c: 'C';
  d: 'D';
  e: 'E';
  f: 'F';
  g: 'G';
  h: 'H';
  i: 'I';
  j: 'J';
  k: 'K';
  l: 'L';
  m: 'M';
  n: 'N';
  o: 'O';
  p: 'P';
  q: 'Q';
  r: 'R';
  s: 'S';
  t: 'T';
  u: 'U';
  v: 'V';
  w: 'W';
  x: 'X';
  y: 'Y';
  z: 'Z';
};

type ExtractFromAlphabetTable<S> = S extends keyof AlphabetTable ? AlphabetTable[S] : S;

type MyCapitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${ExtractFromAlphabetTable<First>}${Rest}`
  : S;

// 최종 답
type MyCapitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S;
```

## 풀이 과정

# 어려웠던 점 & 알게 된 점

1. 어떻게 첫 번째 문자로 접근해서 첫 번째 문자 + 나머지 문자를 합친 형태를 반환할 수 있을까?
2. 첫 번째 문자를 어떻게 대문자로 바꿀 수 있을까?

1번의 경우 `${infer First}${infer Rest}`를 통해 마치 배열의 스프레드 문법 처럼 첫 번째 문자와 나머지 문자가 추출 되는 것을 우연히 발견해 적용할 수 있었다.

```ts
type AlphabetTable = {
  a: 'A';
  b: 'B';
  c: 'C';
  d: 'D';
  e: 'E';
  f: 'F';
  g: 'G';
  h: 'H';
  i: 'I';
  j: 'J';
  k: 'K';
  l: 'L';
  m: 'M';
  n: 'N';
  o: 'O';
  p: 'P';
  q: 'Q';
  r: 'R';
  s: 'S';
  t: 'T';
  u: 'U';
  v: 'V';
  w: 'W';
  x: 'X';
  y: 'Y';
  z: 'Z';
};

type ExtractFromAlphabetTable<S> = S extends keyof AlphabetTable ? AlphabetTable[S] : S;
```

2번의 경우 초기엔 a ~ z를 table 형태의 type으로 만들어 첫번째 문자가 만약 해당 테이블 내 포함된다면 해당 문자의 대문자를 반환하도록 로직을 구성했는데 정말 비효율적으로 코드 라인이 늘어나는 것을 확인할 수 있었다.

하지만 타입스크립트에는 Uppercase라는 유틸리티 타입을 제공해준다.

```ts
type MyCapitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S;
```

따라서 위와 같이 Uppercase의 제네릭 내 First를 추가한 것과 Rest를 합친 것을 template literal 형태로 반환하면 되는 것을 알 수 있다.
