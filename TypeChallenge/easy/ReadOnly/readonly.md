## 문제

---

`T`의 모든 프로퍼티를 읽기 전용(재할당 불가)으로 바꾸는 내장 제네릭 `Readonly<T>`를 이를 사용하지 않고 구현하세요.

** 예시 **

```ts
interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
```

## 정답 및 풀이 과정

---

### 답

```ts
type MyReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};
```

### 풀이 과정

>

1. `MyReadonly`는 Object에 있는 `모든 프로퍼티가 readonly 상태`여야 한다.
2. `readonly`는 `프로퍼티 왼쪽`에 쓰일 수 있다.
3. 그래서 Key는 T의 key들을 모두 포함`(key in keyof T)` 하여 `readonly를 왼쪽에 넣어줌`으로써, `모든 프로퍼티에 대해 readonly 상태`를 만들 수 있다.

## 새롭게 알게 된 내용

---

### 알게 된 점

`readonly<T>`

```ts
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

- `T의 모든 프로퍼티`를 `readonly` 상태로 만들어 주는 `유틸리티 타입`

## ex

```ts
type MyReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};

interface Study {
  typescript: string;
  oop: string;
}

const myStudy: MyReadonly<Study> = {
  typescript: "typechellenge",
  oop: "oopstudy",
};

// Cannot assign to 'typescript' because it is a read-only property.(2540)
myStudy.typescript = "tc";
```

- T를 `typescript, oop를 프로퍼티`로 하는 `Study(interface)` 생성
- `Readonly<T>`와 동일한 `MyReadonly<T>`를 생성
- `MyReadonly<Study>`를 타입으로 하는 객체 `myStudy` 생성
- myStudy의 `typescript 프로퍼티를 재 할당` 하려고 하면 다음과 같은 `2540 에러가 발생`하는 것을 확인(`모든 프로퍼티가 readonly`이기 때문)

`readonly`의 사용

1. interface, type (생략)

2. array

- 마찬가지로 타입 왼쪽 붙여 사용이 가능

** ex **

```ts
let myStudy: readonly string[] = ["oopstudy", "typechellenge"];

// Index signature in type 'readonly string[]' only permits reading.(2542)
myStudy[1] = "ts";
```

- myStudy라는 `readonly string 배열` 생성
- myStudy의 `1번째 인덱스를 재 할당`하는 경우 2542 에러 발생`(readonly 이기 때문에 재 할당이 안됨)`
