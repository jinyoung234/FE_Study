# 문제

`String#length`처럼 동작하는 문자열 리터럴의 길이를 구하세요.

# 정답 및 풀이 과정

## 답

```ts
type Flatten<T extends any[], K extends any[] = []> = T extends []
  ? K
  : T extends [infer F, ...infer R]
  ? F extends any[]
    ? Flatten<[...F, ...R], K>
    : Flatten<[...R], [...K, F]>
  : T;
```

# 어려웠던 점 & 알게 된 점

1. 왜 S['length']는 number로 추론이 될까?
2. 왜 배열의 'length'는 배열의 길이가 추론되는데, 문자열의 'length'는 문자열의 길이가 추론이 되지 않을까?

이 고민을 하다 결국 문제를 풀지 못했다.

하지만 2번째 고민을 한 것에서 답에 조금 근접했던 것을 알 수 있었다.

이 문제의 핵심은 내가 생각한대로 문자열을 배열에 넣어 'length' 프로퍼티로 추론하는 것이기 때문이다.

```ts
type LengthOfString<S extends string, K = []>
```

그러기 위해선 전제 조건이 필요한데, K를 만들어 default value로 배열로 설정하여 이 K를 가지고 'length'를 통해 길이를 추론하게 된다.

```ts
type LengthOfString<S extends string, T = []> = S extends `${infer F}${infer R}`
  ? LengthOfString<R, [...T, F]>
  : T['length'];
```

S에 대해 infer 키워드를 통해 F(irst)와 R(est)로 분리한다.

Recursive Type Alias를 통해 S가 빈 문자열이 아닐 때 까지 조건부 타입으로 확인한다.

S가 여전히 빈 문자열이 아니라면 R이 S가 되고 T가 [...T, F]가 되어 다시 Recursive Type Alias 형태로써 다시 LengthOfString을 실행하고, 빈 문자열이라면 계속 추가해 뒀던 문자열 배열을 'length'를 통해 총 길이를 확인한다.
