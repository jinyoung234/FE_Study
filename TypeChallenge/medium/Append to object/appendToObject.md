# 문제

주어진 인터페이스에 새로운 필드를 추가한 object 타입을 구현하세요. 이 타입은 세 개의 인자를 받습니다.

예시:

```ts
type Test = { id: '1' };
type Result = AppendToObject<Test, 'value', 4>; // expected to be { id: '1', value: 4 }
```

# 정답 및 풀이 과정

## 답

```ts
type AppendToObject<T, U extends string, V> = {
  [P in keyof T | U]: (T & { [K in U]: V })[P];
};
```

# 어려웠던 점 & 알게 된 점

```ts
type AppendToObject<T, U extends string, V> = T & { [K in U]: V };
```

처음에 T와 { [K in U] : V }를 합치면 되겠다는 생각에 위와 같은 코드를 작성하였다.

하지만 인터섹션 타입이 아닌 하나의 결합된 object를 요구하기 때문에 오답이 나오게 되었다.

따라서, T와 { [K in U]: V }를 mapped type을 활용해서 key와 value를 객체에 하나하나 추가해야 겠다고 생각했다.

```ts
type AppendToObject<T, U extends string, V> = {
  [P in keyof T | U]: (T & { [K in U]: V })[P];
};
```

`[P in keyof T | U]`로 하게 되면 새로운 객체의 key인 P는 T의 key 뿐만 아니라 U도 포함되게 된다.
이 타입을 작성하면서 가장 많은 고민을 했던 부분은 새로운 객체의 key에 대해 value를 어떻게 대응 시키냐 였다.

`(T & { [K in U]: V })[P]`를 통해 T와 { [K in U]: V }를 합성 시킨 타입을 P로 대응함으로써 해결할 수 있었다.
