---
id: 4a054301-0a9c-439a-bf0e-ab5d73338246
---

# Union 和 Enum

## Union

##### Union

- 定义多个数据类型;
- 但是一次只能使用一种;

```c
union quantity {
  short count;
  float weight;
  float volume;
};
```

## Enum 类型

##### Enum

```c
enum colors {RED, GREEN, BLUE};

printf("%d\n", RED); // 0
printf("%d\n", GREEN);  // 1
printf("%d\n", BLUE);  // 2
```

##### 定义 Enum 类型变量

```c
enum colors color;
color = BLUE;
printf("%i\n", color); // 2
```

##### 自动编号

- 自动从 0 递增;
- 指定值后根据指定值递增;

```c
enum {
  A,    // 0
  B,    // 1
  C = 4,  // 4
  D,    // 5
  E,    // 6
  F = 3,   // 3
  G,    // 4
  H     // 5
};
```
