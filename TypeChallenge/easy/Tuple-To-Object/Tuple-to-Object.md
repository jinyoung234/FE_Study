## 문제

---

배열(튜플)을 받아, 각 원소의 값을 key/value로 갖는 오브젝트 타입을 반환하는 타입을 구현하세요.

### code

```ts
const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type result = TupleToObject<typeof tuple>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

## 정답 및 풀이 과정

---

### 답

```ts
type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K;
};
```

### 풀이 과정

1. 어떻게 배열이 객체의 프로퍼티가 되는지 궁금해서 as const에 대해 찾아봤다.

2. as const는 배열을 객체화가 되도록 도와주는 문법적 표현 이었다.

#### ex

```ts
const ts = ["type", "script", "study"] as const;
// {0 : "type", 1: "script", 2: "study"}
```

3. 그래서 객체 안에 `{[K in T[?]] : K;}` 하면 풀릴거 같았다.

4. 구글링 하다가 T[number]가 튜플을 순회할 때 사용이 가능하다는 걸 보고 추가했다.

## 새롭게 알게 된 내용

---

`as const`

Typescript 3.4 ver에서 추가된 const assertion 기능을 활용하기 위한 문법적 표현이다. const assertion은 말 그대로 상수라고 주장하는 것인데, 원래 상수가 아닌 것을 상수인 것으로 선언하는 기능이라고 유추 해볼 수 있다.

상수가 아닌 것을 상수로 만들어야 하는 이유가 뭘까?! 그 전에 상수로 선언했을 경우 어떻게 되는지 확인해보자

##### let과 const의 Typescript적 이해

```
const ts = 'Typescript' // const ts : 'Typescript'
let ts  = 'Typescript' // let ts: string
```

let으로 선언하는 경우 할당 된 값의 Type으로 추론하지만, const의 경우 할당된 값 그 자체를 Type으로 받아오는 것을 알 수 있다. 할당된 특정 값 그 자체를 Type으로 취급하는 것을 Literal Type이라고 한다.

그러면 만약에 let으로 선언된 값을 as const로 하게 type assertion 하면 어떻게 될까?

```ts
let ts = "Typescript" as const; // ts : 'Typescript'
```

let으로 선언했음에도 불구하고 as const를 하게 되면 ts의 타입이 'Typescript' 형식으로 변하는 것을 알 수 있다. 만약 재할당을 하게 되면 어떻게 될까?

```ts
ts = "TypeScript"; // '"TypeScript"' 형식은 '"Typescript"' 형식에 할당할 수 없습니다.
```

let임에도 불구하고 할당될 수 없다는 에러를 발견할 수 있다. 이는 타입을 const라고 단언 해버렸기 때문이다. 그렇기에 let일지라도 const처럼 쓰이는 것이다. 하지만 이렇게 사용하는 것은 올바르지는 않은 문법이다.(애초에 let을 const라고 하면 되기 때문이다.)

상수가 아닌 것을 상수로 만들어야 하는 이유에 대해서 이제 알아보자

```ts
/**
 * const typeChallenge: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
 */
const typeChallenge = {
  1: "juyoung",
  2: "youngju",
  3: "hyunji",
  4: "jeonghye",
  5: "jinyoung",
};
```

이 object를 보게 되면 각 key에 대한 value의 type이 string이다. 만약, 내가 string이 아닌 value의 형식 그 자체로 보고 싶을 경우 어떻게 해야할까?

```ts
/**
 * const typeChallenge: {
    readonly 1: "juyoung";
    readonly 2: "youngju";
    readonly 3: "hyunji";
    readonly 4: "jeonghye";
    readonly 5: "jinyoung";
 }  
 */

const typeChallenge = {
  1: "juyoung",
  2: "youngju",
  3: "hyunji",
  4: "jeonghye",
  5: "jinyoung",
} as const;

typeChallenge[1] = "jinyoung"; // 읽기 전용 속성이므로 '1'에 할당할 수 없습니다.
```

이렇게 객체 옆에 as const를 붙여주게 되면 각 key에 대한 value의 타입이 value 형식 그 자체가 될 수 있다. 이렇게 함으로써 각 key는 readonly 옵션이 붙기 때문에 각 프로퍼티에 대한 재 할당을 불가능하게 만들어줄 수 있다.

```ts
const ts = ["type", "script", "study"] as const;

type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K;
};

/**
 * type TypeScriptObj = {
    script: "script";
    type: "type";
    study: "study";
 }
 */
type TypeScriptObj = TupleToObject<typeof ts>;
```

배열 또한 마찬가지다. 아까 만든 TupleToObject를 적용하게 되면 ts는 as const로 처리하였기 때문에 TupleToObject의 T에는 배열에 있는 값 형식 그대로 type으로 들어가게 되고 T[number]를 통해 각 type을 순환하며 TypeScriptObj의 key와 value의 값이 그대로 보여지게 되는 것이다.
