// https://www.bilibili.com/video/BV154STYGEjG?spm_id_from=333.788.player.switch&vd_source=8cdf38a327e672302c1291d0920a37ed&p=4

// 1原型链继承
// 2构造函数继承
// 3组合继承
// 4原型式继承
// 5寄生式继承
// 6寄生组合继承 最优

// 1.原型链继承
// 问题：数据共享，会相互影响
// function Parent() {
//     this.name = 'parent1'
//     this.play = [1, 2, 3]
// }
// function Child() {
//     this.type = 'child'
// }

// Child.prototype = new Parent();
// console.log(new Child())

// var s1 = new Child();
// var s2 = new Child();
// s1.play.push(4)
// console.log(s1.play, s2.play) // [1, 2, 3, 4] [1, 2, 3, 4]
 
// 2. 构造函数继承
// 优点：解决了原型链继承的缺点（数据共享，会相互影响）
// 问题：无法继承父类原型上的方法
// function Parent() {
//     this.name = 'Parent'
//     this.play = [1, 2, 3]
// }

// Parent.prototype.getName = function () {
//     return this.name
// }

// function Child() {
//     Parent.call(this)
//     this.type ='child'
// }
// var s1 = new Child();
// var s2 = new Child();
// s1.play.push(4)
// console.log(s1.play, s2.play) // [1, 2, 3, 4] [1, 2, 3]
// console.log(s1.getName()) // 报错：因为没有继承原型的方法

// 3. 组合继承（前两种的组合）
// 问题： Parent3 执行了两次
// function Parent3() {
//     this.name = 'parent3'
//     this.play = [1, 2, 3]
// }
// Parent3.prototype.getName = function () {
//     return this.name
// }

// function Child3 () {
//     // 第二次调用Parent3
//     Parent3.call(this)
//     this.type = 'child3'
// }
// // 第一次调用Parent3
// Child3.prototype = new Parent3();
// Child3.prototype.constructor = Child3;
// var s1 = new Child3();
// var s2 = new Child3();
// s1.play.push(4)
// console.log(s1.play, s2.play) // [1, 2, 3, 4] [1, 2, 3]
// console.log(s1.getName()) 
// console.log(s2.getName()) 

// 4. 原型式继承
// let parent4 = {
//     name: 'parent4',
//     play: [1, 2, 3],
//     getName: function () {
//         return this.name
//     }
// }

// let person4 = Object.create(parent4)
// person4.name = 'tom'
// person4.play.push(4)

// let person5 = Object.create(parent4)
// person5.play.push(5)
// console.log(person4.name, person4.getName())
// console.log(person5.name)
// console.log(person4.play) // [1, 2, 3, 4, 5]
// console.log(person5.play) // [1, 2, 3, 4, 5]

// 5. 寄生式继承
// let parent5 = {
//     name: 'parent5',
//     play: [1, 2, 3],
//     getName: function () {
//         return this.name
//     }
// }

// function clone (original) {
//     let clone = Object.create(original);
//     clone.getPlay = function () {
//         return this.play
//     }
//     return clone;
// }

// let person5 = clone(parent5);
// let person6 = clone(parent5);
// person5.play.push(4)
// console.log(person5.getName()) // 'parent5'
// console.log(person5.getPlay()) // [1, 2, 3, 4]
// console.log(person6.getPlay()) // [1, 2, 3, 4]

// 6. 寄生组合继承 最优
function clone(parent, child) {
    child.prototype = Object.create(parent.prototype)
    child.constructor.prototype = child
}

function Parent6 () {
    this.name = 'parent6'
    this.play = [1, 2, 3]
}
Parent6.prototype.getName = function (){
    return this.name
}

function Child6() {
    Parent6.call(this)
    this.friend = 'child6'
}
clone(Parent6, Child6)
Child6.prototype.getFriend = function (){
    return this.friend
}

let person6 = new Child6()
let person7 = new Child6()
console.log(person6)
console.log(person6.getName())
console.log(person6.getFriend())
person6.play.push(4)
console.log(person6.play) // [1, 2, 3, 4]
console.log(person7.play) // [1, 2, 3]




