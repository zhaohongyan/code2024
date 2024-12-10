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

		// 不使用箭头函数的写法
		// const self = this;
		// const params = Array.prototype.slice.apply(arguments)
		// console.log('arguments', arguments);
		// console.log('this', this);
		// timer = setTimeout(function () {
		// 	fn.apply(self, params);
		// 	timer = null;
		// }, delay);
	};
};

function handleResize() {
	console.log("窗口大小变化了", window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", debounce(handleResize, 5000));
window.addEventListener("resize", handleResize);

// 输入联想
const input = document.getElementsByTagName("input")[0];
function handler(e) {
	console.log(e.target.value);
}
// input.oninput = handler
input.oninput = debounce(handler, 200);
