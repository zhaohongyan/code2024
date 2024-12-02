// https://juejin.cn/post/6844903830283370503?searchId=2024112018425153FE2BEF255E238858F2
// 1. 工厂函数
// 优点：解决了复用的问题
// 缺点：无法判断对象的类型
// function person (name, age) {
//     const o = new Object();
//     o.name = name
//     o.age = age
//     o.sayHello = function () {
//         console.log('hi, ', this.name);
//     }
//     return o
// }
// const Amy1 = person('Amy', 10)
// const Emma1 = person('Emma', 10)

// 2. 构造函数
// 每个实例都创建了一份属于自己的副本，造成内存浪费
// function Person (name, age) {
//     this.name = name;
//     this.age = age;
//     this.sayHello = function () {
//         console.log('hi, ', this.name)
//     }
// }
// const Amy2 = new Person('Amy', 10)
// const Emma2 = new Person('Emma', 20)

// 3. 原型
// 原型模式解决了属性和方法的共享问题
// 但对于引用类型的属性，各实例对象会相互影响
// function person () {
//     person.prototype.name = 'Emma'
//     person.prototype.age = 30
//     person.prototype.sayHello = function () {
//         console.log('hi, ', this.name)
//     }
// }
// const Amy3 = new Person('Amy', 30)

// 4. 原型＋构造函数（组合模式，使用最广泛的）
// 构造函数用于定义实例属性， 原型用于定义共享属性和方法
// 缺点：每创建一个实例对象，原型方法都被重复定义一次
// function Person(name, age) {
//     this.name = name;
//     this.age = age
// }
// Person.prototype = {
//     constructor: Person,
//     sayHello: function () {
//         console.log('hi, ', this.name)
//     }
// }
// const Amy4 = new Person('Amy', 10)

// 5. 动态原型
// 解决了组合模式的缺点，使用if语句，使得原型方法只初始化一次
// function Person (name, age) {
//    this.name = name;
//    this.age = age;
//     if (typeof this.sayHello !== 'function') {
//         Person.prototype.sayHello = function () {
//             console.log('hi, ', this.name)
//         }
//     }
// }
// const Amy5 = new Person('Amy', 10)
// 6. 寄生构造函数, 创建对象的方式和工厂函数一致，调用方式不一样
// 没有什么应用场景
// function Person (name, age) {
//     const obj = new Object();
//     obj.name = name;
//     obj.age = age;
//     obj.sayHello = function() {
//         console.log('hi, ', this.name)
//     }
// }
// const Amy6 = new Person('Amy', 10);

// 7. 稳妥构造函数
// 没有公共属性
// 不使用new
// 不使用this
// function Person (name, age) {
//     const obj = new Object()
//     obj.name = name;
//     obj.age = age;
//     obj.sayHello = function () {
//         console.log('hi, ', name)
//     }
// }
// const Amy7 = Person('Amy')