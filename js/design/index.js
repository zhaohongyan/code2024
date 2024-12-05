// 构造器模式
// function Person(name, age) {
// 	this.name = name;
// 	this.age = age;
// 	this.sayHello = function () {
// 		console.log(`name is ${name}, age is ${age}`);
// 	};
// }

// const p1 = new Person("Amy", 10);
// const p2 = new Person("Emma", 20);
// console.log(p1);
// console.log(p2);

// 原型模式
// function Person(name, age) {
// 	this.name = name;
// 	this.age = age;
// }

// Person.prototype.sayHello = function () {
// 	console.log(`name is ${this.name}, age is ${this.age}`);
// };

// const p1 = new Person("Amy", 10);
// const p2 = new Person("Emma", 20);
// p1.sayHello()
// p2.sayHello()
// console.log(p1);
// console.log(p2);

// 新写法
// class Person {
//     constructor(name, age) {
//         this.name = name
//         this.age = age
//     }
//     sayHello () {
//         console.log(`name is ${this.name}, age is ${this.age}`);
//     }
// }

// const p1 = new Person("Amy", 10);
// const p2 = new Person("Emma", 20);
// p1.sayHello()
// p2.sayHello()
// console.log(p1);
// console.log(p2);

// 工厂模式
// function UseFactory(role) {
// 	function User(role, pages) {
// 		this.role = role;
// 		this.pages = pages;
// 	}

// 	switch (role) {
// 		case "admin":
// 			return new User("admin", ["user-manage", "news-manage"]);
// 		case "editor":
// 			return new User("editor", ["news-manage"]);
// 		default:
// 			throw new Error("参数错误");
// 	}
// }
// var user = UseFactory("editor");

// 新写法
// function UseFactory(role) {
// 	class User {
// 		constructor(role, pages) {
// 			this.role = role;
// 			this.pages = pages;
// 		}
// 	}
// 	switch (role) {
// 		case "admin":
// 			return new User("admin", ["user-manage", "news-manage"]);
// 		case "editor":
// 			return new User("editor", ["news-manage"]);
// 		default:
// 			throw new Error("参数错误");
// 	}
// }
// var user = UseFactory("editor");

// 抽象工厂模式
// class User {
// 	constructor(name, role, pages) {
// 		this.name = name;
// 		this.role = role;
// 		this.pages = pages;
// 	}
// 	welcome() {
// 		console.log(`welcome ${this.name}!`);
// 	}
// }

// class AdminUser extends User {
// 	constructor(name) {
// 		super(name, "admin", ["user-manage", "news-manage"]);
// 	}
// 	addUser() {}
// 	removeUser() {}
// }

// class EditorUser extends User {
// 	constructor(name) {
// 		super(name, "editor", ["news-manage"]);
// 	}
// 	addNews() {}
// 	removeNews() {}
// }

// function getAbstractUser(role) {
// 	switch (role) {
// 		case "admin":
// 			return AdminUser;
// 		case "editor":
// 			return EditorUser;
// 		default:
// 			throw new Error("参数错误");
// 	}
// }
// var userClass = getAbstractUser("admin");
// var user = new userClass("Amy");

// 单例模式
// var Singleton = (function() {
//     var instance

//     function User(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     return function(name, age) {
//         if (!instance) {
//             instance = new User(name, age)
//         }
//         return instance
//     }
// })()

// class Singleton {
//     constructor(name, age) {
//         if (!Singleton.instance) {
//             this.name = name
//             this.age = age
//             Singleton.instance = this
//         }
//         return  Singleton.instance
//     }

//     sayHello() {
//         console.log(`name ${this.name}, age ${this.age}`);
//     }
// }

// var user = new Singleton('Amy', 10)

// 观察者模式
// class Subject {
//     constructor() {
//         this.observers = []
//     }

//     add(observer) {
//         this.observers.push(observer)
//     }
//     remove(observer) {
//         this.observers = this.observers.filter(item => item !== observer)
//     }
//     notify() {
//         this.observers.forEach(observer => {
//             observer.update()
//         })
//     }
// }

// class Observer {
//     constructor(name) {
//         this.name = name
//     }
//     update() {
//         console.log(`update ${this.name}`);
//     }
// }

// var sub = new Subject()
// var ob1 = new Observer(1)
// var ob2 = new Observer(2)
// sub.add(ob1)
// sub.add(ob2)
// sub.notify()
// setTimeout(() => {
//     sub.remove(ob2)
// }, 1000);
// setTimeout(() => {
//     sub.notify()
// }, 2000);

// 订阅发布模式
var PubSub = {
    message: {},
    subscribe(type, cb) {
        if (!this.message[type]) {
            this.message[type] = [cb]
        } else {
            this.message[type].push(cb)
        }
    },
    unsubscribe(type, cb) {
        if (!this.message[type]) return
        if (!cb) {
            this.message[type] = []
        }
        this.message[type] = this.message[type].filter(item => item !== cb)
    },

    publish(type, data) {
        if (!this.message[type]) return
        
        this.message[type].forEach(cb => cb(data));
    },
}

function testA (data) {
    console.log('testA', data);
}
function testB (data) {
    console.log('testB', data);
}
PubSub.subscribe('A', testA)
PubSub.subscribe('B', testB)

PubSub.publish('A', '1111')
PubSub.publish('B', '2222')