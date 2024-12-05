Function.prototype.myBind = function (context, ...args) {
    // console.log('this', this)  // this 指向的是 obj1.sayHello 这个方法
    context = context || window
    const key = Symbol()
    context[key] = this

    return function (...otherArgs) {
        const result = context[key](...args, ...otherArgs)
        delete context[key]
        return result
    }
}

Function.prototype.myApply = function (context, args) {
    context = context || window
    const key = Symbol()
    context[key] = this

    const result = context[key](...args)
    delete context[key]
    return result
}

Function.prototype.myCall = function (context, ...args) {
    context = context || window
    const key = Symbol()
    context[key] = this

    const result = context[key](...args)
    delete context[key]
    return result
}


const obj1 = {
    name: 'Amy',
    sayHello(age) {
        console.log(`my name is ${this.name}, age is ${age}`)
    }
}
// const fn1 = obj1.sayHello.bind({name: 'Emma'})
// console.log(obj1.sayHello(18))
// console.log(fn1(30))

// console.log(obj1.sayHello.apply({name: 'Emma'}, [31]))
// console.log(obj1.sayHello.call({name: 'Emma'}, 32))

const fn2 = obj1.sayHello.myBind({name: 'Emma'})
fn2(30)
obj1.sayHello.myApply({name: 'Emma'}, [31])
obj1.sayHello.myCall({name: 'Emma'}, 32)

// function Parent () {
//     this.name = 'parent'
//     this.play = [1, 2, 3]
// }
// Parent.prototype.getName = function (){
//     return this.name
// }

// function Child () {
//     Parent.apply(this)
//     this.type = 'child'
// }
// let c1 = new Child()
// console.log(c1.name)
// console.log(c1.play)
// console.log(c1.type)
// console.log(c1.getName()) // 报错原因，不会继承原型上的方法

