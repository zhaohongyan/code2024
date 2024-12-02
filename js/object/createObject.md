### 创建对象

1. 工厂模式 思想：函数封装
```javascript
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log("this.name:", this.name);
  };
  return o;
}
var person1 = createPerson('Amy', 30, 'teacher');
var person2 = createPerson('Emma', 30, 'developer');
```

2. 构造函数
  [new](./new.js)
    new 调用构造函数实际经历的步骤：
  - 创建一个新对象
  - 将构造函数的作用域赋给新对象，（因此this就指向了这个对象）
  - 执行构造函数中的代码（为这个新对象添加属性）
  - 返回新对象
    问题：
  - 每个方法都要在每个实例上重新创建一遍；

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log("this.name:", this.name);
  };
}

var person1 = new Person("Amy", 30, "teacher");
var person2 = new Person("Emma", 30, "developer");

```

3. 原型模式 prototype

    思想：
  - prototype属性 是一个指针，指向一个对象，这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。
  - prototype就是通过调用构造函数而创建的那个对象实例的原型对象。
  - 使用原型对象的好处就是可以让所有对象实例共享它包含的属性和方法。
  - 换句话说，不必在构造函数中定义对象实例的信息，可以将这些信息直接添加到原型对象中。
    缺点：
  - 属性包含引用类型，属性值共享
    扩展：
  - 如何判断一个属性是原型属性还是实例属性？
  ```javascript
  function hasPrototypeProperty (obj, name) {
    return !Object.hasOwnProperty(obj, name) && (name in obj)
  }
  ```

```javascript
function Person() {}
Person.prototype.name = "Emma";
Person.prototype.age = 28;
Person.prototype.sayName = function() {
  console.log(this.name);
};

var person1 = new Person("Amy", 30, "teacher");
// 实例和构造函数没有直接关系
// 关系存在于 实例与构造函数的原型对象
console.log("person1.__proto__ == Person.prototype", person1.__proto__ == Person.prototype);
// 原型对象的constructor指向构造函数
console.log("Person == Person.prototype.constructor", Person == Person.prototype.constructor);
```

4. 组合使用构造函数模式和原型模式

    思想：构造函数模式用于定义实例属性，原型模式用于定义方法和共享属性,结果，每个实例都有自己的一份实例属性的副本，但同时又共享着对方法的引用

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}

Person.prototype = {
  constructor: Person,
  sayName: function() {
    console.log(this.name);
  }
};

var person1 = new Person('Amy', 30, 'teacher');
var person2 = new Person('Emma', 30, 'developer');
```

5. 动态原型模式
    思想：将所有信息封装在构造函数中，通过在构造函数中初始化原型（仅在必要的情况下），又保持了同时使用构造函数和原型的优点。

    换句话说，可以通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型。

    注意：使用动态原型模式时，不能使用动态字面量重写原型。

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  if (typeof this.sayName != "function") {
    Person.prototype.sayName = function() {
      console.log(this.name);
    };
  }
}
var person1 = new Person("Emma", 30, "developer");

```


6. 寄生构造函数模式（寄生parasitic）| 对比工厂模式和构造函数模式

思想：创建一个函数，这个函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象。

构造函数在没有返回值得情况下，默认会返回新对象实例，而通过在构造函数的末尾添加一个retur语句，可以重写调用构造函数时返回的值。

返回的函数和构造函数或构造函数的原型没有任何关系；

```javascript
function Person(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log("this.name:", this.name);
  };
  return o;
}

var person1 = new Person("Emma", 30, "developer");

function SpecialArray() {
  var values = new Array();
  values.push.apply(values, arguments);
  values.toPipedString = function() {
    return this.join("|");
  };
  return values;
}

var colors = new SpecialArray("red", "pink", "yellow");
console.log(colors.toPipedString());
```

7. 稳妥构造函数模式  | 对比寄生构造函数

    所谓稳妥对象，指的是没有公共属性，而且其他方法也不引用this的对象；稳妥对象最适合在一些安全的环境中（这些环境中禁止使用this和new），或者在防止数据被其他应用程序改动时使用。

    遵循与寄生构造函数类似的模式，但有两点不同：一是新创建的对象实例没有this;二是不使用new操作符调用构造函数。

```javascript
function Person(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log("name:", name);
  };
  return o;
}

var person1 = Person('Emma', 30, 'developer');
person1.sayName();
```
