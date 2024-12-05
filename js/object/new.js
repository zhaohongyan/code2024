// new 原理介绍
// 创建一个新的空对象 obj
// 将构造函数的作用域赋给新对象（this指向新对象）
// 执行构造函数中的代码（为这个新对象添加属性）
// 返回新对象

// constructor
function _new(ctor, ...arg) {
  // ① 创建一个新的空对象 obj
  const obj = {};
  // ② 将新对象的的原型指向当前函数的原型
  obj.__proto__ = ctor.prototype;
  // ③ 新创建的对象绑定到当前this上
  const result = ctor.apply(obj, arg);
  // ④ 如果没有返回其他对象，就返回 obj，否则返回其他对象
  return typeof result === 'object' ? result : obj;
}
function Person(name) {
  this.name = name;
}
var p = new Person('Amy')
console.log(p)
var p1 = _new(Person, 'Emma');
console.log(p1)
console.log(Person.prototype.constructor === Person);
console.log(p1.constructor === Person);
console.log(p1.__proto__ === Person.prototype);
// https://www.bilibili.com/video/BV154STYGEjG?spm_id_from=333.788.player.switch&vd_source=8cdf38a327e672302c1291d0920a37ed&p=5

// function _new (ctor, ...args) {
//   if (typeof ctor !== 'function') {
//     throw 'ctor must be a function'
//   }

//   let obj = new Object()
//   obj.__proto__ = Object.create(ctor.prototype)
//   let res = ctor.apply(obj, args)

//   let isObjct = typeof res === 'object' && typeof res !== null
//   let isFunction = typeof res === 'function'
//   return isFunction || isObjct ? res : obj
// }

