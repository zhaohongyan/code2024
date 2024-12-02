// 浅拷贝
function shallowClone(target) {
	if (typeof target === "object" && target !== null) {
		const cloneTraget = Array.isArray(target) ? [] : {};
		for (const key in target) {
			if (target.hasOwnProperty(key)) {
				cloneTraget[key] = target[key];
			}
		}
		return cloneTraget;
	} else {
		return target;
	}
}

console.log(shallowClone('111'))
const arr = [1, 2, {o: 0}];
arr[2].o = 1;
console.log(shallowClone(arr))
const obj = {a: {b: 0}}
obj.a.b = 1;
console.log(shallowClone(obj))

// 深拷贝-基础版
function deepClone(obj) {
    let cloneObj = {}
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            cloneObj[key] = deepClone(obj[key])
        } else {
            cloneObj[key] = obj[key]
        }
    }
    return cloneObj;
}   
const obj2 = {a: {b: 0}}
const target = deepClone(obj2)
console.log(target)
obj2.a.b = 1;
console.log(target)