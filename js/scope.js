var scope = 'global'
// function checkScope () {
//     var scope = 'local'
//     function fn() {
//         return scope
//     }
//     return fn()
// }
// console.log(checkScope())

function checkScope () {
    var scope = 'local'
    function fn() {
        return scope
    }
    return fn
}

console.log(checkScope()())

// 题目1：
// var n = 100;
// function foo() {
// 	n = 200;
// }

// foo();

// console.log(n);

// 题目2：
// function foo() {
// 	console.log(n);
// 	var n = 200;
// 	console.log(n);
// }

// var n = 100;
// foo();

// 题目3：
// var n = 100
// function foo1() {
//     console.log(n);
// }
// function foo2() {
//     var n = 200
//     console.log(n);
//     foo1()
// }

// foo2()
// console.log(n);

// 题目4:
// var a = 100;
// function foo() {
// 	console.log(a);
// 	return;
// 	var a = 100;
// }
// foo();
