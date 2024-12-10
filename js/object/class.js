/**
 * 类
 * ES6 的类，完全可以看作构造函数的另一种写法。
 * 类的所有方法都定义在类的prototype属性上面
 * 类内部定义的方法是不可枚举的
 * Object.assign 方法可以很方便地一次向类添加多个方法
 * 类的内部所有定义的方法，都是不可枚举的（non-enumerable）
 * get set
 * 类的属性名，可以采用表达式。
 * 箭头函数内部的this总是指向定义时所在的对象。
 * 实例属性可以定义在constructor()方法里面的this上面，也可以定义在类的最顶层；(亲测：定义在对顶层无效，代码报错)
 * 
 * new.target
 * Class 内部调用new.target，返回当前 Class。
 * 需要注意的是，子类继承父类时，new.target会返回子类。
 * 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
 */

/**
 * 静态方法
 * 定义：在一个方法前加static关键字， 静态方法不会被类继承
 * 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。
 * 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
 * 特点：
 * 静态方法可以与非静态方法重名。
 * 父类的静态方法，可以被子类继承
 * 静态方法也是可以从super对象上调用的。
 *
 */

/**
 * 静态属性
 * Class本身的属性
 * ES6 明确规定，Class 内部只有静态方法，没有静态属性
 */

/**
 * 私有属性 私有方法
 * 只能在类的内部访问的方法和属性，外部不能访问
 * 这是常见需求，有利于代码封装，只能通过变通方法模拟实现
 */

class Point {
	static a = 1; // 静态属性
	
	constructor(x, y) {
		this.x = x; // this 代表实例对象
		this.y = y;
	}

	// _z = 0 // error
	
	toString() {
		return '(' + this.x + ', ' + this.y + ')';
	}
	
	static getName() { // 静态方法
		return 'Emma'
	}
}

console.log(typeof Point); // 'function'
console.log(Point === Point.prototype.constructor ) // true


var p = new Point(1, 2);
console.log(p.toString()) // (1, 2)
console.log(p.constructor === Point.prototype.constructor); // true

Object.assign(Point.prototype, {
	toValue(){ return 1 },
	toBool(){ return true }
});

// 类内部定义的方法是不可枚举的
console.log(Object.keys(Point.prototype)) // ["toValue", "toBool"]
console.log(Object.getOwnPropertyNames(Point.prototype)) // ["constructor", "toString", "toValue", "toBool"]


var pp = new Point(3, 4); 
console.log(pp.getName()); // error
console.log(Point.getName()); // 'Emma'

class IncreasingCounter {
  _count = 0;
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}