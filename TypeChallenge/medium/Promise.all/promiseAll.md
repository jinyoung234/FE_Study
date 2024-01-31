# 문제

> 이 챌린지에는 TypeScript 4.0 사용이 권장됩니다.

PromiseLike 객체 배열을 받아들이는 함수 `PromiseAll`을 입력하면 반환 값은 `Promise<T>`이어야 하며, 여기서 `T`는 확인된 결과 배열입니다.

```ts
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);
```

# 정답 및 풀이 과정

## 답

```ts
declare function PromiseAll<T extends unknown[]>(
  values: [...T]
): Promise<{
  [key in keyof T]: Awaited<T[key]>;
}>;
```

## 풀이 과정

1. 제네릭을 추가 후 extends 키워드를 통해 T가 배열만 허용하도록 한다.
2. values의 타입으로 T를 spread operator를 통해 펼침으로써 배열의 각 요소에 대한 타입을 얻을 수 있도록 한다.
3. Promise 내 제네릭으로 맵드 타입과 Awaited를 사용해서 Promise 타입이 래핑된 타입을 제거 한 타입의 배열을 Promise 타입으로 래핑 하여 반환한다.

   - 예시

   ```ts
   const promise1 = Promise.resolve(3);
   const promise2 = 42;
   const promise3 = new Promise<string>((resolve, reject) => {
     setTimeout(resolve, 100, 'foo');
   });
   // expected to be `Promise<[number, 42, string]>`
   const p = PromiseAll([promise1, promise2, promise3] as const);
   ```

# 어려웠던 점 & 알게 된 점

## 어려웠던 점

1. T를 조건부 타입으로 접근할 때 readonly 키워드를 추가해야할지 말지 파악하는게 어렵다.
2. T를 조건부 타입과 infer 키워드를 통해 배열 내 특정 요소로 접근이 가능하다해도 Promise.resolve의 반환 값을 어떻게 추출해야할지 모르겠다.
3. union 타입의 경우엔 도대체 어떻게 접근을 해야 해야할지 감을 잡을 수 없었다.

## 해결 방법

풀이 과정을 이해하고 나니 해당 함수가 어떻게 동작할지 감을 잡을 수 있었다.
