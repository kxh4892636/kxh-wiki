---
id: b87de832-cbe7-4a9c-aea3-7dcc0cd1730c
---

# struct 和 typedef

## struct

### 基础

##### 定义

```c
struct fraction {
  int numerator;
  int denominator;
};
```

##### 声明

```c
struct fraction f1;

f1.numerator = 22;
f1.denominator = 7;
```

##### 声明并初始化

```c
struct car {
  char* name;
  float price;
  int speed;
};

// 顺序一致, 未初始化自动赋 0
struct car saturn = {"Saturn SL/2", 16000.99, 175};
```

##### 存储空间

- 最大内存占用属性的存储空间的倍数;

### 复制

```c
struct cat { char name[30]; short age; } a, b;

strcpy(a.name, "Hula");
a.age = 3;

b = a;
b.name[0] = 'M';

printf("%s\n", a.name); // Hula
printf("%s\n", b.name); // Mula
```

### struct 指针

##### 值传递

- struct 作为函数参数为值传递;

##### struct 指针

```c
void happy(struct turtle* t) {
}

happy(&myTurtle);
```

### struct 的嵌套

##### 基础

```c
struct species {
  char* name;
  int kinds;
};

struct fish {
  char* name;
  int age;
  struct species breed;
};
```

##### 自我引用

```c
struct node {
  int data;
  struct node* next;
};
```

## typedef

### 基础

```c
// 基本类型
typedef unsigned char BYTE;
BYTE c = 'z';

// 指针
typedef int* intptr;
int a = 10;
intptr x = &a;

// 函数
typedef signed char (*fp)(void);
```

### 作用

##### 代码可读性

```c
typedef char* STRING;
STRING name;
```

##### 自定义结构类型

```c
typedef struct animal {
  char* name;
  int leg_count, speed;
} animal;

// 匿名自定义类型
typedef struct {
  char *name;
  int leg_count, speed;
} animal;
```
