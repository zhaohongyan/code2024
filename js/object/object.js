/* 
  Object.defineProperty(obj, prop, descriptor) 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。
  Object.defineProperties(obj, props) 定义多个属性
  如果不指定configurable, writable, enumerable ，则这些属性默认值为false，如果不指定value, get, set，则这些属性默认值为undefined
  
  Object.getOwnPropertyDescriptor(obj, prop) 返回指定对象上一个自有属性对应的属性描述符。（数据属性，不是访问器属性）
  Object.getOwnPropertyDescriptors(obj) 方法用来获取一个对象的所有自身属性的描述符。（数据属性，不是访问器属性）
  （自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
*/

// var person = {};
// Object.defineProperty(person, "name", {
//   writable: false,
//   value: "Emma"
// });
// console.log(person.name);
// person.name = "Frank";
// console.log(person.name);

// var person = {};
// Object.defineProperty(person, "list", {
//   writable: false,
//   value: [1, 2, 3]
// });
// console.log(person.list);
// person.list.push(4);
// console.log(person.list);

// 面试问题： 怎样让数组无法更改？
// Object.freeze(person); 也不可行

// var book = {
//   _year: 2004
// };
// console.log(book._year);

// _year 前面的下划线是一种常用的标记符号，用于表示只能通过对象的方法访问的属性；

var book = { name: "emma" };
Object.defineProperties(book, {
  _year: {
    writable: true,
    value: 2004
  },
  edition: {
    writable: true,
    value: 1
  },
  year: {
    get: function () {
      return this._year;
    },
    set: function (newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    }
  }
});

var name_descriptor = Object.getOwnPropertyDescriptor(book, "name");
console.log("name des", name_descriptor);
var _year_descriptor = Object.getOwnPropertyDescriptor(book, "_year");
console.log("_year des", _year_descriptor);

var person = 1;
console.log('person des', Object.getOwnPropertyDescriptor(window, "person"));
// { value: 1, writable: true, enumerable: true, configurable: false }

var person = {
  name: 'aaa'
};
console.log(Object.getOwnPropertyDescriptors(person));
for (const key in person) {
  console.log('--', key)
  if (Object.hasOwnProperty.call(person, key)) {
    console.log('==', key)
  }
}
console.log(Object.keys(person))

