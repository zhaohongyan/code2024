// 节流
// 场景： 鼠标移动，log鼠标位置 & 监听滚动，是否触底

const throttle = (fn, delay) => {
    let timer = null;
    
    return function () {
        if (timer)  return 
        
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay)
    }
}

const handleMouseMove = (e) => {
    console.log(e.pageX, e.pageX)
}

window.addEventListener('mousemove', throttle(handleMouseMove, 500))