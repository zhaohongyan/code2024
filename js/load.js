window.onload = () => {
	console.info("start");
	setTimeout(() => {
		console.info("timeout");
	});
	// 浏览器空闲时间执行
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
	window.requestIdleCallback(() => {
		console.info("requestIdleCallback");
	});

    // window.requestAnimationFrame() 方法会告诉浏览器你希望执行一个动画。
    // 它要求浏览器在下一次重绘之前，调用用户提供的回调函数。
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
	window.requestAnimationFrame(() => {
		console.info("requestAnimationFrame");
	});
	console.info("end");
};

// start
// end
// timeout
// requestAnimationFrame
// requestIdleCallback
