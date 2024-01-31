# 문제

Implement Python liked `any` function in the type system. A type takes the Array and returns `true` if any element of the Array is true. If the Array is empty, return `false`.

Python의 `any` function을 타입 시스템으로 구현하세요

배열을 사용하고 배열의 요소가 참이면 `true`를 반환합니다. 배열이 비어 있으면 `false`를 반환합니다

예시:

```ts
type Sample1 = AnyOf<[1, '', false, [], {}]>; // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]>; // expected to be false.
```

# 정답 및 풀이 과정

## 답

```ts
type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Rest]
  ? First extends 0 | '' | false | [] | Record<string, never> | undefined | null;
    ? AnyOf<Rest>
    : true
  : false;
```

# 어려웠던 점 & 알게 된 점

```ts
type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Rest]
  ? First extends 0 | '' | false | [] | {} | undefined | null
    ? AnyOf<Rest>
    : true
  : false;
```

초반에 답을 위와 같이 작성했다.

T의 요소들을 순회하며 First의 값이 0, '', false, [], {}, undefined, null 중 하나면 First를 제외한 요소를 돌며 배열 내 요소가 빈 배열이 될 때까지 순회하여 빈 배열이면 false로 나오도록 했다.

그리고 7가지 값 중 하나가 아니라면 true가 나오도록 반환했다.

하지만 내가 생각한대로 동작하지 않았고 오답이 되었다.

원인은 빈 객체를 추가 했기 때문이며, `{}`를 타입으로 사용해선 안된다.

실제로 만약 eslint를 사용하는 프로젝트에서 빈 객체를 확인하기 위해 `{}`를 지정하면 `@typescript-eslint/ban-types` 린트가 걸리게 된다.

`{}` 대신 `Record<string, never>`를 통해 빈 객체를 표현할 수 있다.

```ts
type AnyOf<T extends readonly any[]> = T[number] extends
  | 0
  | ''
  | false
  | []
  | Record<string, never>
  | undefined
  | null
  ? false
  : true;
```

여담으로 T[number]를 사용하면 더 간단하게 문제를 해결할 수 있다.
