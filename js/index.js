// 1.如何让 obj== 1 && obj == 2 && obj == 3
// let obj = {
//     value: 0,
//     valueOf:function () {
//         this.value++
//         return this.value
//     }
// }
// console.log(obj == 1 && obj == 2 && obj == 3)

// 2. 判断变量的类型
// function getType (obj) {
//     let type = typeof obj;
//     if( type !== 'object') {
//         return type
//     }
//     return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
// }
// console.log(getType('123'))
// console.log(getType(123))
// console.log(getType(Symbol()))
// console.log(getType(1n))
// console.log(getType(true))
// console.log(getType(undefined))
// console.log(getType(null))
// console.log(getType({}))
// console.log(getType([]))
// console.log(getType(() => {}))
// console.log(getType(/123/g))
// console.log(getType(window))

// let i = 0;
// let timer;
// let fn = () => {
// 	timer = setTimeout(() => {
// 		i++;
// 		console.log(i);
//         if(i < 10) {
//             fn()
//         } else {
//             clearTimeout(timer)
//         }
// 	}, 1000);
// };
// fn()

function *gen() {
    console.log('enter')
    let a = yield 1;
    let b = yield (function(){return 2})()
    console.log('==', a, b)
    return 3
}

let g = gen(); // 程序阻塞住，不会执行任何语句
console.log(typeof g) // 'object'
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next()) // {value: undefined, done: true}