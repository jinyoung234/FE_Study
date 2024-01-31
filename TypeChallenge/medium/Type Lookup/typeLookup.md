# 문제

때때로 유니온 타입의 특정 속성을 기준으로 조회할 수도 있습니다.

이 챌린지에서는 유니온 타입 `Cat | Dog`에서 공통으로 사용하는 `type` 필드를 기준으로 해당하는 타입을 얻고자 합니다. 다시 말해서, 다음 예시에서는 `LookUp<Cat | Dog, 'dog'>`으로 `Dog` 타입을, `LookUp<Cat | Dog, 'cat'>`으로 `Cat` 타입을 얻을 수 있습니다.

```ts
interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type MyDogType = LookUp<Cat | Dog, 'dog'>; // 기대되는 결과는 `Dog`입니다.
```

# 정답 및 풀이 과정

## 답

```ts
type LookUp<U, T extends string> = U extends { type: T } ? U : never;
```

## 풀이 과정

1. T가 유니온 타입 또는 단일 타입이기 때문에 분산적 조건부 타입을 적용하여 T의 각 멤버마다 U extends {type : T}인지 확인한다.
2. 만약 맞다면, 그 멤버를 반환하고 아니라면 never를 반환한다.
3. 1-2번 과정을 반복해서 최종적인 LookUp 타입의 결과를 반환한다.

# 어려웠던 점 & 알게 된 점

1. 어떻게 union 타입에서 특정 타입만 골라낼 수 있을까?
2. type 프로퍼티를 어떻게 활용해서 문제를 해결할 수 있을까?

위 2가지 문제가 정말 생각하기 어려웠고 답을 보게 되었다.

하지만 답을 보아도 제대로 이해되지 않아서 gpt에게 질의를 했고 다음과 같은 키워드를 알게 되었다.

## [분산적인 조건부 타입](https://www.typescriptlang.org/ko/docs/handbook/2/conditional-types.html#%EB%B6%84%EC%82%B0%EC%A0%81%EC%9D%B8-%EC%A1%B0%EA%B1%B4%EB%B6%80-%ED%83%80%EC%9E%85)

타입스크립트 공식문서에도 설명했다싶이 조건부 타입은 유니언 타입을 만나게 되면 분산적으로 동작하게 된다.

```ts
U extends { type: T } ? U : never;
```

따라서 위 구문에서 유니언 타입 U는 각 멤버(ex - Animal -> Dog, Cat) 마다 `{type : T}`를 확인하고 맞으면 그 멤버를 반환하게 된다.

### 예제

```ts
type A = LookUp<Animal, 'dog' | 'cat' | 'bird'>;
```

A를 예로 들면, LookUp 타입 특성 상 T의 타입은 유니온 타입으로 U가 {type : T}에 해당하는지 총 3번 확인하게 된다. dog과 cat은 각각 Dog와 Cat 인터페이스 내 type 프로퍼티에 포함되어있어 Dog | Cat이 된다.

하지만, bird는 포함되어있지 않기 때문에 never가 되어 위 유니온 타입에 포함되지 않는다.

즉, 결과는 Dog | Cat이 되는 것이다.

# 레퍼런스

- [분산적 조건부 타입](https://www.typescriptlang.org/play?ssl=51&ssc=16&pln=51&pc=37#code/PQKgUABBBsBMEFoIBUCeAHAphAMgezwGsBXdSRBSq8gI1QgEEA7AFwAs8n6AxYiACgACAQ1YAzYgEoIAYkAvPYFbF2cSYBLTrIC2wsuRn6IgCcnAHN1hygGVbzgHQ6IgAnHAE02AKMYiABhcCh44A1xiIE6lwKgTEQFjBwEZBwBFxiEAGOsAAScAecZtABwnAGLXAA1WIQAwhwBHmiEAI8cBWoftAE6aAOjMoQBdxiEAZGcAGzsABycAF0cAcQcAUprsnVzcIAAMAYWEWCAAfCAARPABzTsaIQFeahViIQBqBwEqxwA1Vls6WDExOiEARVcAdlsAfToiYm0AXVcBPprX2sMBu0cADmsAE8YhAS1WCwoh8wB2hiEAFzrOGgAaT6AGXGIIAIMa+jXW+CIAFV0AAeXr9IajMbAgDkABNxpiAHydeaddE7dwhYGdWGEBHIvqDEbjLEAYz6BKJNh6fTJbjuYVS2TyRRKXU6GwAzuRVKxMAAnMTCZnYFEQADe5CgmywAC4IJjWSxMRqIDRZZhMNjxbrMQw6OLxdLVKJMQzMQBlDiy9jCVSyl1DTHdYiygA2-r1ACFMEwxsIw+QAL4i6UsOUKpWMsZq41azDW3FjI1QKCm82W60ACTwKmx4cxEdlqhYLFEqDrEeIIZDBfbeAAHnKi8XmXgQ3hZdbTXgAO5MOvTthNzB1mghxWEIdJ8i5iAAWVQ6LQWAgAF5cAQaUiVWimXqe-iIMBgBFAADNgAwWlqABprAD8161JbnecgxU6EUHwAcSbCtiBoKY5HCXU2GbdArSfFhxWZNhCgAK3FQpxzGYA4GAQg8DAEBgDMUAIAAfVouj6LoiBABvR8I6ggQAVef2CA3EAUg6aIYgTqIgcizB3alaThCBMD7VMmEtNUd11cUWEbGME2BZApJk6N5LhABtTFc0xABdB8z0k6TZPk1UIEUlAIATCAAH4IEk3UmEwAA3OUAG5KJAfjBPoiBABlFwASocADqWIEAAHnSjCwKgto4SKNUTR0HHfodxsgBRABHYg42BbK+ywZl+kcsRZTwTQ9UEXMEAwuMQ2jMZMHFYBiBYVQQ3FI0wBTNNFWVel1U1LZrQNIdSwtK09VtVB7UdZ1XQ9DK2B9P1XSDUN2xauMjS3Ab5SGzNszGnU7zxWgzRmytqzk9tG2bVt207bs8VdCN+0HcgRzHCc9SnWd50XVMVzXZkNzALcd2YVK41PCBr0zUStggVlxTaxG9PIYrSpYRE8oKkNEXEpE4e0EMsXvYF0XxfFAVxkrMDKwn8rjUmL1pCnCr1SaGaRvp6cZ4z-ISxLQQgQALpsAEZrxaC5KwFAcgH18QBXppmWwVngiBEJYZDtVQ9DMJwvDZQIojRHFac5WI0ioFVjW4IQpCUOANCMOw3D8MI2BgHFUdOvUJhJQdz5AA9OiBjEAHAnABOWl39bdj2Te9827bIiigA)
