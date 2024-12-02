const sleep = (delay) => {
    for(let start = Date.now(); Date.now() - start <= delay;) {}
}

// 不加sleep的情况下，一个时间片就执行完毕了
// 增加sleep, 将任务分配到多帧执行
const taskQueue = [
    () => {
        console.log('task1 start')
        sleep(20);
        console.log('task1 end')
    },
    () => {
        console.log('task2 start')
        sleep(20);
        console.log('task2 end')
    },
    () => {
        console.log('task3 start')
        sleep(20);
        console.log('task3 end')
    },
]


function proformUnitWork () {
    taskQueue.shift()()
}

function workloop (deadline) {
   console.log(`此帧剩余时间： ${deadline.timeRemaining()}, 是否超时： ${deadline.didTimeout}`)

    while((deadline.timeRemaining() > 0 || deadline.didTimeout) && taskQueue.length > 0) {
        proformUnitWork()
    }

    // 如果还有未完成的壬戌，继续调用requestIdleCallback 申请下一个时间片
    if (taskQueue.length > 0) {
        window.requestIdleCallback(workloop, {timeout: 1000})
    }

}

window.requestIdleCallback(workloop, {timeout: 1000})