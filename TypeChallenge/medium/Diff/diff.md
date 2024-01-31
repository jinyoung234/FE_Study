# 문제

`O` & `O1`의 차이점인 `객체`를 가져옵니다

# 정답 및 풀이 과정

## 답

```ts
type Diff<O extends Record<string, any>, O1 extends Record<string, any>> = {
  [P in keyof (O & O1) as P extends keyof (O | O1) ? never : P]: (O & O1)[P];
};
```

# 어려웠던 점 & 알게 된 점

Diff 문제는 간단하다.

mapped type을 사용한 후 `P in keyof (O & O1)`를 통해 O와 O1의 합집합에 대한 모든 key를 순회하되, as 키워드를 통해 `P extends keyof (O | O1) ? never : P`를 작성하여 P가 O와 O1의 교집합 key에 해당되면 순회하지 않고 그렇지 않으면 순회하도록 한다.

그 후, `(O & O1)[P]`를 통해 O와 O1의 합집합의 P를 함으로써 사실상 문제에서 말하는 차이점인 객체를 만들 수 있다.
