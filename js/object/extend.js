// https://www.bilibili.com/video/BV154STYGEjG?spm_id_from=333.788.player.switch&vd_source=8cdf38a327e672302c1291d0920a37ed&p=4

function Parent() {
    this.name = 'parent'
    this.play = [1, 2, 3]
}
Parent.prototype.parentType = 'parentType'
Parent.prototype.getName = function () {
    return this.name
}

// 1.原型链继承
// 问题1：数据共享，会相互影响
// 问题2：无法继承父类原型上的方法
// function Child() {
//     this.type = 'child'
// }

// Child.prototype = new Parent();
// Child.prototype.constructor = Child; // 修正指向

// var s1 = new Child();
// var s2 = new Child();
// console.log(s1)
// s1.play.push(4)
// console.log(s1.play, s2.play) // [1, 2, 3, 4] [1, 2, 3, 4]

// ---------------------------------------------------------------------- 
// 2. 构造函数继承
// 优点：解决了原型链继承的问题1（数据共享，会相互影响）
// 问题：无法继承父类原型上的方法
// function Child() {
//     Parent.call(this)
//     this.type ='child'
// }
// var s1 = new Child();
// var s2 = new Child();
// s1.play.push(4)
// console.log(s1)
// console.log(s1.play, s2.play) // [1, 2, 3, 4] [1, 2, 3]
// console.log(s1.parentType) // undefined
// console.log(s1.getName()) // 报错：因为没有继承原型的方法

// ---------------------------------------------------------------------- 
// 3. 组合继承（前两种的组合）
// 利用【原型链】实现对原型属性和方法的继承，
// 通过【借用构造函数】来实现对实例属性和方法的继承
// 问题： Parent 执行了两次
// function Child () {
//     // 第二次调用Parent
//     Parent.call(this)
//     this.type = 'child'
// }
// // 第一次调用Parent
// Child.prototype = new Parent();
// Child.prototype.constructor = Child; // 修正指向

// var s1 = new Child();
// var s2 = new Child();
// console.log(s1) 
// s1.play.push(4)
// console.log(s1.play, s2.play) // [1, 2, 3, 4] [1, 2, 3]
// console.log(s1.getName()) 

// ------------------------------基于Object.create()---------------------------------------- 
let parent = {
    name: 'parent',
    play: [1, 2, 3],
    getName: function () {
        return this.name
    }
}

// 4. 原型式继承
// let s1 = Object.create(parent)
// s1.name = 'tom'
// s1.play.push(4)

// let s2 = Object.create(parent)
// s2.play.push(5)
// console.log(s1)
// console.log(s1.name, s1.getName())
// console.log(s1.play) // [1, 2, 3, 4, 5]
// console.log(s2.play) // [1, 2, 3, 4, 5]

// ---------------------------------------------------------------------- 
// 5. 寄生式继承，在原型式的基础上实现增强
// function clone (original) {
//     let clone = Object.create(original);
//     clone.getPlay = function () {
//         return this.play
//     }
//     return clone;
// }

// let s1 = clone(parent);
// let s2 = clone(parent);
// s1.play.push(4)
// console.log(s1.getName()) // 'parent'
// console.log(s1.getPlay()) // [1, 2, 3, 4]
// console.log(s2.getPlay()) // [1, 2, 3, 4]

// ---------------------------------------------------------------------- 
// 6. 寄生组合继承 最优
// 解决了数据共享问题
// 也能继承原型属性、实例属性
// function clone(p, c) {
//     c.prototype = Object.create(p.prototype)
//     c.constructor.prototype = c
// }

// function Child() {
//     Parent.call(this)
//     this.friend = 'child friend'
// }
// clone(Parent, Child)
// Child.prototype.getFriend = function (){
//     return this.friend
// }

// let s1 = new Child()
// let s2 = new Child()
// console.log(s1)
// console.log(s1.getName())
// console.log(s1.getFriend())
// s1.play.push(4)
// console.log(s1.play) // [1, 2, 3, 4]
// console.log(s2.play) // [1, 2, 3]
