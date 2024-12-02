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