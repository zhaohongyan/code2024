// 静态属性和方法
// 静态属性是 一组在类本身上定义的特性，而不是在类的实例上定义的特性。
// class Color {
//     static staticProp = '111'
// 	static isValid(r, g, b) {
// 		return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
// 	}
// }
// console.log(Color.staticProp);
// console.log(Color.isValid(255, 0, 0)); // true
// console.log(Color.isValid(1000, 0, 0)); // false

// const a = new Color()
// console.log(a);
// console.log(a.staticProp); // undefined
// a.isValid(255, 0, 0) // a.isValid is not a function

// 私有属性
// class Color {
// 	// 声明：每个 Color 实例都有一个名为 #values 的私有字段。
// 	#values;
// 	constructor(r, g, b) {
// 		this.#values = [r, g, b];
// 	}
// 	getRed() {
// 		return this.#values[0];
// 	}
// 	setRed(value) {
// 		if (value < 0 || value > 255) {
// 			throw new RangeError("无效的 R 值");
// 		}
// 		this.#values[0] = value;
// 	}
// }

// const red = new Color(255, 0, 0);
// red.setRed(1000); // RangeError：无效的 R 值
