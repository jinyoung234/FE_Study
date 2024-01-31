# 문제

`T`에서 `K` 프로퍼티만 읽기 전용으로 설정해 새로운 오브젝트 타입을 만드는 제네릭 `MyReadonly2<T, K>`를 구현하세요. `K`가 주어지지 않으면 단순히 `Readonly<T>`처럼 모든 프로퍼티를 읽기 전용으로 설정해야 합니다.

예시:

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
todo.completed = true; // OK
```

# 정답 및 풀이 과정

## 답

```ts
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;
```

## 풀이 과정

1. Omit을 통해 T 타입에서 K 프로퍼티를 제외한 나머지는 그대로 유지한다.
2. Pick을 통해 T 타입 중 K 프로퍼티는 readonly를 적용 시킨다.
3. intersection 타입을 통해 두 타입을 포함시킨다.

# 어려웠던 점 & 알게 된 점

# 새롭게 알게 된 내용
