# 문제

T에서 K 프로퍼티만 제거해 새로운 오브젝트 타입을 만드는 내장 제네릭 Omit<T, K>를 이를 사용하지 않고 구현하세요.

예시:

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>;

const todo: TodoPreview = {
  completed: false,
};
```

# 정답 및 풀이 과정

## 답

```ts
type MyOmit<T extends Record<string, any>, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};
```

## 풀이 과정

# 어려웠던 점 & 알게 된 점
