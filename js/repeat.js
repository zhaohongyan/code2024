// 重复执行一个函数,如3秒执行一次，执行3次
// repeat(fn, times, wait)
function repeat (fn, times, wait) {
    let that = this
    let count = 0
    let result
    return function () {
        let timer = setInterval(() => {
            if (count >= times ) {
                clearInterval(timer);
                return
            }
            result = fn.apply(that, arguments)
            count++
        }, wait)

        return result
    }
}

const r = repeat(console.log, 3, 2000)
r('111')
