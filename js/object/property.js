/*
属性的特征
  数据属性（数据描述符）：
    [[Configurable]]:默认值true
      能否用delete删除从而重新定义属性
      能否修改属性的特性
      能否把属性修改为访问器属性

    [[Enumerable]]:默认值true
      能否通过for-in循环
    
    [[Writable]]:默认值true
      能否修改属性的值

    [[Value]]:默认值undefined
      这个属性的数据值


  访问器属性（存取描述符）：
    [[Configurable]]:默认值true
      能否用delete删除从而重新定义属性
      能否修改属性的特性
      能否把属性修改为数据属性

    [[Enumerable]]:默认值true
      能否通过for-in循环

    [[Get]]：默认值undefined，读取属性函数

    [[Set]]：默认值undefined，写入属性函数

  *数据描述符与存取描述符不可混用,会抛出错误

*/

// 在对象中添加存取描述符属性
// Object.defineProperty(), Object.defineProperties()
// var obj = {};
// var aValue; //如果不初始化变量, 不给下面的a属性设置值,直接读取会报错aValue is not defined
// var b;
// Object.defineProperty(obj, 'a', {
//   configurable: true,
//   enumerable: true,
//   get: function () {
//     return aValue
//   },
//   set: function (newValue) {
//     aValue = newValue;
//     b = newValue + 1
//   }
// })
// console.log(b) // undefined
// console.log(obj.a)  // undefined, 当读取属性值时，调用get方法,返回undefined
// obj.a = 2;  // 当设置属性值时,调用set方法,aValue为2

// console.log(obj.a) // 2  读取属性值,调用get方法,此时aValue为2
// console.log(b) // 3  再给obj.a赋值时,执行set方法,b的值被修改为2,额外说一句,vue中的计算属性就是利用setter来实现的


// 全局环境下:
var a = 1; // a属于window, 相当于window.a
var d = Object.getOwnPropertyDescriptor(window, 'a');
console.log(d)
// {
//     configurable: false,
//     value: 1,
//     writable: true,
//     enumerable: true
// }

// 在来看一下另一种不适用var声明的方式初始化a变量
a = 1; //a相当于window的一个属性, window.a
var d = Object.getOwnPropertyDescriptor(window, 'a');
console.log(d)
// {
//     configurable: true,   // 此时configurable属性值为true
//     value: 1,
//     writable: true,
//     enumerable: true
// }
// 注意:
// 只有使用var, let等操作符才是定义变量，而不使用var，直接a = 1;这样a的含义为window的一个属性，并不是我们所说的变量的概念。
// 使用var定义的任何变量，其configurable属性值都为false, 定义对象也是一样
// 但是这里需要说明的一点是,使用字面量定义的对象,该对象内部的属性的数据描述符属性都为true


//当writable为false并且configrubale为true,[[value]]可以通过defineeProperty修改, 但不能直接赋值修改