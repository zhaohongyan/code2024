// 字符串相关的算法题目

// 看不懂系列，题目都看不懂
// 报数

// 翻转整数
// 不做容错了，限定类型是数字，在最大值和最小值之间
function fn1(num) {
	let res =
		num > 0
			? String(num).split("").reverse().join("")
			: String(num).slice(1).split("").reverse().join("");
	return num > 0 ? parseInt(res, 10) : 0 - parseInt(res, 10);
}
// console.log(fn1(123));
// console.log(fn1(-123));
// console.log(fn1(120));

// 字母异位词
// 就是还是那些字母组成的，就是位置不同
function fn2(s, t) {
	return s.split("").sort().join("") === t.split("").sort().join("");
}
// console.log(fn2('anagram', 'nagaram'));
// console.log(fn2('rat', 'car'));

// 字符串转整数
function fn3(s) {
	const res = s.trim().match(/^(-|\+)?\d+/g);
	return res ? res[0] : 0;
}

// console.log(fn3('-42'));
// console.log(fn3('4193 with'));
// console.log(fn3('words 987')); // 0

// 反转字符串
// 输入：['h', 'e', 'l', 'l', 'o']
// 输出：['o', 'l', 'l', 'e', 'h']
// function fn4(arr) {
//     return arr.reverse()
// }

// function fn4(arr) {
// 	for (let i = 0; i < arr.length / 2; i++) {
// 		[arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
// 	}
// 	return arr;
// }
// console.log(fn4(["h", "e", "l", "l", "o"]));

// 字符串中的第一个唯一字符
// 给定一个字符串，找到他的第一个不重复的字符，并返回他的索引，没有的话返回-1
function fn5(str) {
	const obj = {};
	let res = -1;
	for (let i = 0; i < str.length; i++) {
		let ele = str[i];
		if (!obj[ele]) {
			obj[ele] = 1;
		} else {
			obj[ele]++;
		}
	}

	for (const key of Object.keys(obj)) {
		if (obj[key] === 1) {
			res = str.indexOf(key);
			break;
		}
	}
	return res;
}
// console.log(fn5("leetcode"));
// console.log(fn5("loveleetcode"));

// 回文字符串
// function fn6(str) {
//     const str2 = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')
//     const newStr = str2.split('').reverse().join('')
//     return str2 === newStr
// }

function fn6(str) {
	const str2 = str
		.toLowerCase()
		.replace(/[^a-zA-Z0-9]/g, "")
		.split("");

	let i = 0;
	let j = str2.length - 1;
	while (i < j) {
		if (str2[i] === str2[j]) {
			i++;
			j--;
		} else {
			return false;
		}
	}
	return true;
}
// console.log(fn6("A man, a plan, a canal: Panama"));
// console.log(fn6("race a car"));

// 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的
// 第一个位置 (从0开始)。如果不存在，则返回 -1。
// 给定 haystack = 'hello world', needle = 'll' 返回2
// function fn7(haystack, needle) {
//     let reg = new RegExp(needle)
//     return haystack.replace(reg, '*').indexOf('*')
// }

// 遍历的写法
function fn7(haystack, needle) {
	let res = -1;
	for (let i = 0; i < haystack.length; i++) {
		let ele = haystack[i];
		if (ele === needle[0] && haystack.slice(i, i + needle.length) === needle) {
			res = i;
			break;
		}
	}
	return res;
}
// console.log(fn7("hello world", "ll"));
// console.log(fn7("abctghy", "b"));

// 最长公共前缀
// 输入: ["flower","flow","flight"]
// 输出: "fl"
function fn8(arr) {
	// 遍历次数
	let number = Math.min(...arr.map((item) => item.length));
    let i = 1;
    let res = arr[0].slice(0, i)
    let flag = true;

    while(i <= number && flag) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j].indexOf(res) !== 0) {
                flag = false;
                break
            }  else {
                continue
            }
        }
        if (flag) {
            i++
            res = arr[0].slice(0,i)
        }
    }

    return res.slice(0, res.length-1)
}
console.log(fn8(["flower", "flow", "fopoht"]));
