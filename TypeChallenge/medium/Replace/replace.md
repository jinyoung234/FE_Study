# 문제

문자열 S에서 `From`를 찾아 한 번만 `To`로 교체하는 `Replace<S, From, To>`를 구현하세요.

예시:

```ts
type replaced = Replace<'types are fun!', 'fun', 'awesome'>; // expected to be 'types are awesome!'
```

# 정답 및 풀이 과정

## 답

```ts
type Replace<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer First}${From}${infer Rest}`
  ? `${First}${To}${Rest}`
  : S;
```

# 어려웠던 점 & 알게 된 점

1. 어떻게 부분 문자열을 추출해서 From과 비교할 수 있을까?
2. To 문자열과 S에서 From 문자열을 제외한 나머지 문자열을 어떻게 합칠 수 있을까?
