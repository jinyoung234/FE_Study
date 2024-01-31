# 문제

> 이 챌린지에는 TypeScript 4.0 사용이 권장됩니다.

배열 `T`를 사용하고 마지막 요소를 반환하는 제네릭 `Last<T>`를 구현합니다.

예시

```ts
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1
```

# 정답 및 풀이 과정

## 답

```ts
// 나의 답
type Last<T extends any[]> = T extends [...unknown, infer L] ? L : T;

// 다른 분들의 답
type Last<T extends any[]> = [any, ...T][T['length']];
```

## 풀이 과정

1. ...unknown을 통해 마지막 요소를 제외한 나머지 타입들을 모두 포함한다.
2. infer L을 통해 배열의 마지막 요소를 추론한다.
3. T가 빈 배열이 아니라면 L을, 아니라면 T를 반환한다.

# 어려웠던 점 & 알게 된 점

```ts
[any, ...T][T['length']];
```

다른 분들이 작성한 해당 타입이 어떻게 돌아갈 수 있는지 예상하는 것이 어려웠다.

```ts
[any, ...T];
```

우선, 해당 배열의 형태를 통해 T를 포함한 새로운 배열 타입을 생성한다.

```ts
[T['length']];
```

위 새로운 배열에서 인덱스드 엑세스 타입을 통해 특정 위치의 요소 타입을 추출한다.

T['length']는 T의 길이를 나타내며, 0부터 시작하는 인덱스를 기준으로 하기 때문에, [any, ...T] 배열에서 T['length'] 위치는 원래 T 배열의 마지막 요소가 된다.

```plain text
// 예시 - T가 [number, string, boolean] 타입인 경우

1. [any, ...T]는 [any, number, string, boolean]이 된다.

2. T['length']는 3이며, 이는 [any, number, string, boolean] 배열의 3번째 인덱스(0부터 시작하므로 실제로는 4번째 요소)를 의미 한다.

3. 따라서, Last<T>의 타입은 boolean이 된다.
```
