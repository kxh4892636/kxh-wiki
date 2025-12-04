# 测试和调试

## 测试

##### 单元测试

- unit test;
- 针对函数/类/模块各方面,
- 进行正确性检验;

##### 测试用例

- test case;
- 进行单元测试各实例的集合;

### 定义测试

##### 测试函数

- import 语句;
- 测试类;
  - 继承类: unittest.TestCase;
- 测试函数;
  - assert 相关方法;
- if 语句;

```python
import unittest
from test_function import function_name

class TestCase(unittest.TestCase):
    """Tests for 'test_function.py'."""

    def test_case(self):
        return_value = function(args)
        self.assertEqual(test_value, return_value)

if __name__ == '__main__':
    unittest.main()
```

##### 测试类

- import 语句;
- 测试类;
  - 继承类: unittest.TestCase;
- 测试函数;
  - setUp() 函数;
  - assert 相关方法;
- if 语句;

```python
import unittest
from test_class import ClassName

class TestCase(unittest.TestCase):

    def setUp(self):
        """
        Create a survey and a set of responses for use in all test methods.
        """
        self.instance = ClassName(args)
        self.test_value = value

    def test_case(self):
        return_value = self.instance.function_name(args)
        self.assertEqual(test_value, return_value)


if __name__ == '__main__':
    unittest.main()
```

##### 测试结果

- 通过: . ;
- 出现错误: E;
- 断言失败: F;

```python
# 成功
.
----------------------------------------------------------------------
Ran 1 test in 0.000s
OK

# 错误
E
======================================================================
ERROR: test_first_last_name (__main__.NamesTestCase)
----------------------------------------------------------------------
Traceback (most recent call last):
File "test_name_function.py", line 8, in test_first_last_name
formatted_name = get_formatted_name('janis', 'joplin')
TypeError: get_formatted_name() missing 1 required positional argument: 'last'
----------------------------------------------------------------------
Ran 1 test in 0.000s
FAILED (errors=1)

# 失败
.F
======================================================================
FAIL: test_city_country_population (__main__.NamesTestCase)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "d:\kxh\code\python\python_crash_course\chapter_10\test_cities.py", line 12, in test_city_country_population
    self.assertFalse(formatted_name, 'Santiago, Chile - Population 50000')
AssertionError: 'Santiago, Chile - Population 50000' is not false : Santiago, Chile - Population 50000

----------------------------------------------------------------------
Ran 2 tests in 0.000s

FAILED (failures=1)
```

---

**setUp() 方法**

##### 机制

- 一个类中最先被调用的函数,
- 每次执行一个函数都要先执行这个函数;

---

##### if \_\_name\_\_ == '\_\_main\_\_':

- 魔法方法;
- 保证导入某模块时, 不执行该模块;

##### 机制

- 每个 python 模块包含内置变量 \_\_name\_\_, 表示该模块
- 当直接执行该模块时, 其值为 "\_\_main\_\_",
- 当导入到其他模块时, 其值为模块文件名(无后缀 .py),
- 故通过使用上述 if 语句, 当导入该模块时, 不执行对应语句;

```python
# 不使用 if __name__ == '__main__':
# 模块 A
a = 10
print('我是模块A……')
print(a)

# 模块 B
from module import A
b = 20
print('__name__')
print(b)

# 运行模块 A
__main__
10
# 运行模块 B
a
10
__main__
20

# 使用 if __name__ == '__main__':
# 模块 A
a = 10
print('__name__')
if __name__ == '__main__':
  print(a)

# 模块 B
from module import A
b = 20
print('__name__')
print(b)

# 运行模块 B
a
__main__
20
```

### 常用断言方法

##### assertEqual() 方法

- assertEqual(first, second, msg=None);
  - 判断 first 和 second 是否相等, 相等测试成功, 反之失败;
  - first/second: 比较值;
  - msg: 失败时显示信息;

##### assertNotEqual() 方法

- assertNotEqual(first, second, msg=None);
  - 判断 first 和 second 是否不相等, 不相等测试成功, 反之失败; ;
  - first/second: 比较值;
  - msg: 失败时显示信息;

---

##### assertTrue() 方法

- assertTrue(expr, msg=None)
  - 判断 exper 是否为真, 为真测试成功, 反之失败;
  - exper: 判断对象;
  - msg: 失败时显示信息;

##### assertFalse() 方法

- assertFalse(expr, msg=None)
  - 判断 exper 是否为假, 为假测试成功, 反之失败;
  - exper: 判断对象;
  - msg: 失败时显示信息;

---

##### assertIn() 方法

- assertIn(member, container, msg=None);
  - 判断 member 是否在 container 中, 在 container 中测试成功, 反之失败;
  - member: 判断对象;
  - container: 包含若干结果的列表;
  - msg: 失败时显示信息;

##### assertNotIn() 方法

- assertNotIn(member, container, msg=None);
  - 判断 member 是否在 container 中, 不在 container 中测试成功, 反之失败;
  - member: 判断对象;
  - container: 包含若干结果的列表;
  - msg: 失败时显示信息;
