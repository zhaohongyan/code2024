// 场景：输入框的搜索联想 & window.addEventListener('resize')

const debounce = (fn, delay = 500) => {
	let timer = null;

	return function () {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn.apply(this, arguments);
			timer = null;
		}, delay);
	};
};

function handleResize() {
	console.log("窗口大小变化了", window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", debounce(handleResize, 5000));
// window.addEventListener("resize", handleResize);

