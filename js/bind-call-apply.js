// ===============================AI==================================
// Function.prototype.myBind = function (thisArg) {
//     const fn = this;
//     const args = Array.from(arguments).slice(1);

//     return function () {
//         const allArg = args.concat(Array.from(arguments))
//         return fn.apply(thisArg, allArg)
//     }
// }

// Function.prototype.myApply = function (thisArg, argsArray) {
//     const fn = this;
//     return fn.call(thisArg, argsArray)
// }

// Function.prototype.myCall = function (thisArg, ...argsArray) {
//     const fn = this;
//     return fn.apply(thisArg, argsArray)
// }


// ===============================yk==================================
Function.prototype.myBind = function (context, ...args) {
    context = context || window
    const fn = this;
    context.fn = fn

    return function (...otherArgs) {
        const result = context.fn(...args, ...otherArgs)
        delete context.fn
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
// // console.log(fn1(30))
// console.log(obj1.sayHello.apply({name: 'Emma'}, [31]))
// console.log(obj1.sayHello.call({name: 'Emma'}, 32))

const fn2 = obj1.sayHello.myBind({name: 'Emma'})
console.log(fn2(30))
console.log(obj1.sayHello.myApply({name: 'Emma'}, [31]))
console.log(obj1.sayHello.myCall({name: 'Emma'}, 32))