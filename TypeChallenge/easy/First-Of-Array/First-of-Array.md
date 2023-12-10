## 문제

---

<h1>First of Array <img src="https://img.shields.io/badge/-%EC%89%AC%EC%9B%80-7aad0c" alt="쉬움"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/></h1><blockquote><p>by Anthony Fu <a href="https://github.com/antfu" target="_blank">@antfu</a></p></blockquote><p><a href="https://tsch.js.org/14/play/ko" target="_blank"><img src="https://img.shields.io/badge/-%EB%8F%84%EC%A0%84%ED%95%98%EA%B8%B0-3178c6?logo=typescript&logoColor=white" alt="도전하기"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.md" target="_blank"><img src="https://img.shields.io/badge/-English-gray" alt="English"/></a>  <a href="./README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-gray" alt="简体中文"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a> </p><!--info-header-end-->

배열(튜플) `T`를 받아 첫 원소의 타입을 반환하는 제네릭 `First<T>`를 구현하세요.

예시:

```ts
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];
type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
```

## 정답 및 풀이 과정

---

### 답

```ts
type First<T extends any[]> = T extends [] ? never : T[0];
```

### 풀이 과정

1. 들어오는 원소의 첫번째 타입 반환이니까 T[0]으로 하면 되지 않을까?

2. never 쪽에 에러 뜨네 왜 never에 에러가 뜨지 test 케이스 만들어서 해봐야겠다.

```ts
const Hi:First<[]> = never
'never' only refers to a type, but is being used as a value here.(2693)
```

3. 분기 처리 해봐야 겠다 만약 들어오는 T의 타입이 []이면 never 아니면 T[0]이 오게 해야겠다.

4. 방법 몰라서 구글링하니 T extends []가 가능한걸 확인해서 T extends [] ? Never : T[0]이라는 결론이 나오게 됨

## 어려웠던 점 & 알게 된 점

확인 차 `Type First<> = never` 이런 식으로 하니까 2693 에러가 발생해서 원인 해결하기 위해 시간을 오래 썻다. 그 결과 "never는 값이 없기 때문에 type만 올 수 있는 것이고 never type인 것을 확인하려면 extends를 사용해야한다" 라는 걸 알게 됨

## 새롭게 알게 된 내용

---

`extends`

- extends는 generic 안에서만 사용할거라고 생각했지만 결과 값에서도 3항 연산자의 형태로 사용이 가능하다.
-

`Never & never의 타입 체킹 방법`

[link](https://ui.toast.com/posts/ko_20220323)
