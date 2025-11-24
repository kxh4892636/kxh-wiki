# PROXIES AND REFLECT

## Proxy Fundamentals

### Creating a Passthrough Proxy

##### 语法格式

```typescript
const target = {
  id: "target",
};
const handler = {};
const proxy = new Proxy(target, handler);
```

### Defining Traps

##### 定义 Traps

```typescript
const target = {
  foo: "bar",
};
const handler = {
  // Traps are keyed by method name inside the handler object
  get() {
    return "handler override";
  },
};
const proxy = new Proxy(target, handler);
```

##### 调用机制

- 每当 proxy 调用 get() 函数时，
- 会使用 handler 中的 get() 代替调用，
- 使用 target 调用 get() 函数时一切正常。

```typescript
console.log(target.foo); // bar
console.log(proxy.foo); // handler override
console.log(target["foo"]); // bar
console.log(proxy["foo"]); // handler override
console.log(Object.create(target)["foo"]); // bar
console.log(Object.create(proxy)["foo"]); // handler override
```

##### 作用

- 提供代码编写者改变几乎任何原生方法的能力。

### Trap Parameters and the Reflect API

##### Reflect object

- target 上的同名原生方法定义在 Reflect object 上，
- 任何可以在 handle 中定义为 trap 的方法在 Reflect object 都有对应的 API，
- 具有相同的名字和参数。

```typescript
const target = {
  foo: "bar",
};
const handler = {
  get: Reflect.get,
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo); // bar
console.log(target.foo); // bar
```

##### 定义 passthrough proxy

```typescript
const target = {
  foo: "bar",
};
const proxy = new Proxy(target, Reflect);
console.log(proxy.foo); // bar
console.log(target.foo); // bar
```

### Trap Invariants

##### Trap Invariants

- 约束 trap 的准则。

### Revocable Proxies

##### Proxy.revocable() 方法

- Proxy.revocable(target，handler)；
  - 创建一个可销毁的 proxy；
  - 返回值：object；
    - proxy 属性：等同于 new Proxy(target，handler) 创建的 proxy；
    - revoke 属性：revoke() 函数，用于销毁 proxy。

### Utility of the Reflect AP

##### Reflect API vs. Object API

- reflect 对于 trap handler 没有限制；

##### Status Flags

- 一些 Reflect 方法返回 boolean，
  - Reflect.defineProperty
  - Reflect.preventExtensions
  - Reflect.setPrototypeOf
  - Reflect.set
  - Reflect.deleteProperty
- 表示该方法是否执行成功，
- 在一些场景极其有用。

```typescript
// Initial code
const o = {};
try {
  Object.defineProperty(o, "foo", "bar");
  console.log("success");
} catch (e) {
  console.log("failure");
}
// Refactored code
const o = {};
if (Object.defineProperty(o, "foo", "bar")) {
  console.log("success");
} else {
  console.log("failure");
}
```

##### Supplanting Operators with First-Class Functions

##### Safe Function Application

```typescript
Function.prototype.apply.call(myFunc, thisVal, argumentList);
Reflect.apply(myFunc, thisVal, argumentsList);
```

### Proxying a Proxy

```typescript
const target = {
  foo: "bar",
};
const firstProxy = new Proxy(target, {
  get() {
    console.log("first proxy");
    return Reflect.get(...arguments);
  },
});
const secondProxy = new Proxy(firstProxy, {
  get() {
    console.log("second proxy");
    return Reflect.get(...arguments);
  },
});
console.log(secondProxy.foo);
// second proxy
// first proxy
// bar
```

### Proxy Considerations and Shortcomings

##### ' this' Inside a Proxy

##### Proxies and Internal Slots

## Proxy Traps and Reflect Methods

### get()

##### handler.get() 方法

- handler.get(target，property，receiver)。
  - 检索某个属性值。
  - 返回值：任何值。

##### Interceptions

- 略。

##### Trap invariants

- 略。

### set()

##### handler.set() 方法

- handler.set(target，property，value，receiver)。
  - 设置某个属性值。
  - 返回值。
    - true：设置成功；
    - TypeError：设置失败；

##### Interceptions

- 略。

##### Trap invariants

- 略。

### has()

##### handler.has() 方法

- handler.has(target，prop)。
  - in 操作符的 trap 形式。
  - 返回值：boolean。

##### Interceptions

- 略。

##### Trap invariants

- 略。

### defineProperty()

##### handler.defineProperty() 方法

- handler.defineProperty(target，property，descriptor)。
  - Object.defineProperty() 的 trap 形式。
  - 返回值：boolean。

##### Interceptions

- 略。

##### Trap invariants

- 略。

### getOwnPropertyDescriptor()

##### handler.getOwnPropertyDescriptor() 方法

- handler.getOwnPropertyDescriptor(target，prop)。
  - Object.getOwnPropertyDescriptor() 的 trap 形式。
  - 返回值：object/undefined。

##### Interceptions

- 略。

##### Trap invariants

- 略。

### deleteProperty()

##### handler.deleteProperty() 方法

- handler.deleteProperty(target，property)。
  - delete 操作符的 trap 形式。
  - 返回值：boolean。

##### Interceptions

- 略。

##### Trap invariants

- 略。

### ownKeys()

##### handler.ownKeys() 方法

- handler.ownKeys(target)。
  - Reflect.ownKeys() 的 trap 形式 。
  - 返回值：enumerable object。

##### Interceptions

- 略。

##### Trap invariants

- 略。

### getPrototypeOf()

##### handler.getPrototypeOf() 方法

- handler.getPrototypeOf(target)。
  - \[\[GetPrototypeOf\]\] 的 trap 形式。
  - 返回值：object/null。

##### Interceptions

- 略。

##### Trap invariants

- 略。

### setPrototypeOf()

##### handler.setPrototypeOf() 方法

- handler.setPrototypeOf(target，prototype)。
  - Object.setPrototypeOf() 的 trap 形式。
  - 返回值：boolean。

##### Interceptions

- 略。

##### Trap invariants

- 略。

### isExtensible()

##### handler.isExtensible() 方法

- handler.isExtensible(target)。
  - Object.isExtensible() 的 trap 形式。
  - 返回值：boolean。

##### Interceptions

- 略。

##### Trap invariants

- 略。

### preventExtensions()

##### handler.preventExtensions() 方法

- handler.set(target，property，value，receiver)。
  - Object.preventExtensions() 的 trap 形式。
  - 返回值：boolean。

##### Interceptions

- 略。

##### Trap invariants

- 略。

### apply()

##### handler.apply() 方法

- handler.apply(target，thisArg，argumentsList)。
  - function call 的 trap 形式。
  - 返回值：任何值。

##### Interceptions

- 略。

##### Trap invariants

- 略。

### construct()

##### handler.construct() 方法

- handler.construct(target，argumentsList，newTarget)。
  - new 关键字的 trap 形式。
  - 返回值：object。

##### Interceptions

- 略。

##### Trap invariants

- 略。

## Proxy Patterns

### Tracking Property Access

```typescript
const user = {
  name: "Jake",
};
const proxy = new Proxy(user, {
  get(target, property, receiver) {
    console.log("Getting ${property}");
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    console.log("Setting ${property}=${value}");
    return Reflect.set(...arguments);
  },
});
proxy.name; // Getting name
proxy.age = 27; // Setting age=27
```

### Hidden Properties

```typescript
const hiddenProperties = ["foo", "bar"];
const targetObject = {
  foo: 1,
  bar: 2,
  baz: 3,
};
const proxy = new Proxy(targetObject, {
  get(target, property) {
    if (hiddenProperties.includes(property)) {
      return undefined;
    } else {
      return Reflect.get(...arguments);
    }
  },
  has(target, property) {
    if (hiddenProperties.includes(property)) {
      return false;
    } else {
      return Reflect.has(...arguments);
    }
  },
});
// get()
console.log(proxy.foo); // undefined
console.log(proxy.bar); // undefined
console.log(proxy.baz); // 3
// has()
console.log("foo" in proxy); // false
console.log("bar" in proxy); // false
console.log("baz" in proxy); // true
```

### Property Validation

```typescript
const target = {
  onlyNumbersGoHere: 0,
};
const proxy = new Proxy(target, {
  set(target, property, value) {
    if (typeof value !== "Number") {
      return false;
    } else {
      return Reflect.set(...arguments);
    }
  },
});
proxy.onlyNumbersGoHere = 1;
console.log(proxy.onlyNumbersGoHere); // 1
proxy.onlyNumbersGoHere = "2";
console.log(proxy.onlyNumbersGoHere); // 1
```

### Function and Constructor Parameter Validation

```typescript
function median(...nums) {
  return nums.sort()[Math.floor(nums.length / 2)];
}
const proxy = new Proxy(median, {
  apply(target, thisArg, ...argumentsList) {
    for (const arg of argumentsList) {
      if (typeof arg !== "number") {
        throw "Non-number argument provided";
      }
    }
    return Reflect.apply(...arguments);
  },
});
console.log(proxy(4, 7, 1)); // 4
console.log(proxy(4, "7", 1));
// Error: Non-number argument provided
```

```typescript
class User {
  constructor(id) {
    this.id_ = id;
  }
}
const proxy = new Proxy(User, {
  construct(target, argumentsList, newTarget) {
    if (argumentsList[0] === undefined) {
      throw "User cannot be instantiated without id";
    } else {
      return Reflect.construct(...arguments);
    }
  },
});
new proxy(1);
new proxy();
// Error: User cannot be instantiated without id
```

### Data Binding and Observables

```typescript
const userList = [];
class User {
  constructor(name) {
    this.name_ = name;
  }
}
const proxy = new Proxy(User, {
  construct() {
    const newUser = Reflect.construct(...arguments);
    userList.push(newUser);
    return newUser;
  },
});
new proxy("John");
new proxy("Jacob");
new proxy("Jingleheimerschmidt");
console.log(userList); // [User {}, User {}, User{}]
```

```typescript
const userList = [];
function emit(newValue) {
  console.log(newValue);
}
const proxy = new Proxy(userList, {
  set(target, property, value, receiver) {
    const result = Reflect.set(...arguments);
    if (result) {
      emit(Reflect.get(target, property, receiver));
    }
    return result;
  },
});
proxy.push("John");
// John
proxy.push("Jacob");
// Jacob
```
