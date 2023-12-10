---
title: "Exclude"
createdAt: "2022-11-30 16:35"
description: Type Challenge - Exclude
thumbnailUrl: "/typescript/typechallenge.png"
tags: ["Type Challenge", "TypeScript"]
category: "TypeScript"
---

## 문제

---

T에서 U에 할당할 수 있는 타입을 제외하는 `내장 제네릭 Exclude <T, U>` 를 이를 사용하지 않고 구현하세요.

<b>예시</b>

```ts
type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'
```

## 정답 및 풀이 과정

---

### 답

---

```ts
type MyExclude<T, U> = T extends U ? never : T;
```

### 풀이 과정

---

>

## 새롭게 알게 된 내용

---

## 추가 적인 답들

## 레퍼런스

---

>
