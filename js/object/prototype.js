// 原型 原型对象 原型链 构造函数

// isPrototypeOf() 是否是原型对象
// (ES5) Object.getPrototypeOf(obj) 查看原型对象

// hasOwnProperty 检查属性是否存在于对象实例中
// hasPrototypeProperty() 自己实现，不是Object原生方法

// 原型链是通过将一个类型的实例赋值给另一个构造函数的原型实现的
// 原型链的问题：对象实例共享所有继承的属性和方法，因此不适宜单独使用
// 解决方法：借用构造函数，即在子类型构造函数内部调用超类型的构造函数

function Person() {}
Person.prototype.name = "Emma";
Person.prototype.age = 28;
Person.prototype.friends = ["A", "B"];
Person.prototype.sayName = function() {
  console.log(this.name);
};

var person1 = new Person();
var person2 = new Person();

// console.log(Person.prototype.isPrototypeOf(person1)); //  true
// console.log(Object.getPrototypeOf(person1) === Person.prototype); // true

// console.log(person1.hasOwnProperty("name")); // false
// person1.name = "Frank";
// console.log(person1.hasOwnProperty("name")); // true

// 判断属性在原型中
function hasPrototypeProperty(object, name) {
  return !Object.hasOwnProperty(name) && (name in object);
}

console.log(hasPrototypeProperty(person1, "name"));

// Object.keys() 只返回可枚举的属性
// Object.getOwnPropertyNames() 所有属性
// console.log(Object.keys(Person.prototype));
// console.log(Object.keys(person1));
// console.log(Object.getOwnPropertyNames(Person.prototype));
// console.log(Object.getOwnPropertyNames(person1));

// constructor instanceof
// 对象字面量的写法导致constructor不再指向Person,而是Object
// Person.prototype = {
//   constructor: Person, // 这种方式重设会导致constructor的[[enumerable]]属性被设置为true, 默认是false
//   name: "Emma",
//   age: 28
// };
// const friend = new Person();
// console.log(friend instanceof Person); // true
// console.log(friend instanceof Object); // true

// console.log(friend.constructor === Person); // false
// console.log(friend.constructor === Object); // true
// Object.defineProperty(Person.prototype, 'constructor', {
//   enumerable: false
// });
// console.log(Object.keys(Person.prototype));

// 原型的动态性：
// 实例和原型之间的关系是松散的
// 实例中的指针仅指向原型，和构造函数没有关系
// 重写原型对象切断了现有原型与任何值钱已经存在的对象实例之间的联系，它们引用的还是最初的原型

// function Person() {}
// Person.prototype.name = "Emma";
// var person1 = new Person();

// console.log(person1.name);
// Person.prototype = {
//   name: "Frank",
//   age: 28
// };
// console.log(person1.age); // undefined

// 原生对象存在的问题
// 原因是friends属性是原生属性
// person1.friends.push("C");
// console.log("person2", person2.friends);
