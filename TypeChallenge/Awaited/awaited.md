# 문제

Promise와 같은 타입에 감싸인 타입이 있을 때, 안에 감싸인 타입이 무엇인지 어떻게 알 수 있을까요?

예시: 들어 `Promise<ExampleType>`이 있을 때, `ExampleType`을 어떻게 얻을 수 있을까요?

```ts
type ExampleType = Promise<string>;

type Result = MyAwaited<ExampleType>; // string
```

# 정답 및 풀이 과정

---

## 답

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U>
  ? U extends PromiseLike<any>
    ? MyAwaited<U>
    : U
  : never;
```

## 풀이 과정

1. 조건부 타입을 통해 T가 PromiseLike 객체에 해당한다면 infer U가 반환한 타입 U를 추론하고, 아니라면 never 타입이 된다.
2. 다시 조건부 타입을 통해 U가 PromiseLike 타입인지 확인하고 또 해당될 경우 재귀적으로 MyAwaited를 적용하여 U가 PromiseLike 타입이 아닐 때 까지 추론할 것이고 아니라면 U를 반환한다.

# 어려웠던 점 & 알게 된 점

```ts
type Thenable<T> = T extends { then: (onfulfilled: (arg: infer U) => any) => any } ? U : never;

type MyAwaited<T extends { then: (onfulfilled: (arg: any) => any) => any }> = T extends {
  then: (onfulfilled: (arg: any) => any) => any;
}
  ? MyAwaited<Thenable<T>>
  : T;
```

처음에 해당 답안을 통해 error case를 제외하고 모두 통과했지만 error 타입이 never가 아닌 number 타입으로 추론되었다.

이유는 재귀적으로 돌면서 T가 thenable 하지 않다면 T 타입을 그대로 반환했기 때문이다.

never 타입이 Thenable에서 never로 추론되어 MyAwaited에서 never로 추론되도록 설계했지만 의도한대로 동작하지 않았다.

그래서 답안 처럼 조건부 타입을 더 중첩하는 방식을 고민햇고 해결할 수 있었다.

# 새롭게 알게 된 내용

## Promise VS PromiseLike

```ts
/**
 * Represents the completion of an asynchronous operation
 */
interface Promise<T> {
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
```

```ts
interface PromiseLike<T> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): PromiseLike<TResult1 | TResult2>;
}
```

Promise에는 finally만 존재하며, PromiseLike는 then 메서드만 존재하는 것을 확인할 수 있다.

Promise가 정식 스펙이 되기 전 jQuery 같은 옛날 라이브러리에선 catch 구문 없이 Promise를 처리했었기 때문에 타입스크립트에서 이를 지원하기 위해 PromiseLike 타입을 만든 것이다.

# 레퍼런스

- [Array vs ArrayLike, Promise vs PromiseLike](https://yceffort.kr/2021/11/array-arraylike-promise-promiselike)
