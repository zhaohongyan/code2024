// 1. 定义一个类
// 2. 添加构造函数
// 3. 处理resolve和reject回调
// 4. 执行回调函数
class MyPromise {
	static PENDING = "pending";
	static FULFILLED = "fulfilled";
	static REJECTED = "rejected";
	state = MyPromise.PENDING;
	result = undefined;
	// #fulfilledFns = []
	// #rejectedFns = []
	#handlers = []; // [{onFulfilled, onRejected}...]
	constructor(func) {
		const resolve = (result) => {
			if (this.state === MyPromise.PENDING) {
				this.state = MyPromise.FULFILLED;
				this.result = result;
				this.#handlers.forEach(({ onFulfilled }) => {
					onFulfilled(this.result);
				});
			}
		};
		const reject = (result) => {
			if (this.state === MyPromise.PENDING) {
				this.state = MyPromise.REJECTED;
				this.result = result;
				this.#handlers.forEach(({ onRejected }) => {
					onRejected(this.result);
				});
			}
		};

		try {
			func(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}

	then = (onFulfilled, onRejected) => {
		// 不传参数的场景, onFulfilled不是一个函数 -> (x) => x; onRejected不是一个函数 -> (x) => { throw: x }
		onFulfilled =
			typeof onFulfilled === "function"
				? onFulfilled
				: (x) => {
						return x;
				  };
		onRejected =
			typeof onRejected === "function"
				? onRejected
				: (x) => {
						throw x;
				  };
		const p2 = new MyPromise((resolve, reject) => {
			if (this.state === MyPromise.FULFILLED) {
				// 获取返回值
				runAsynctask(() => {
					try {
						const x = onFulfilled(this.result);
						// 函数抽取出来了
						resolvePromise(p2, x, resolve, reject);
						// 判断x和p2是不是同一个对象
						// if(x === p2) {
						//   throw new TypeError('Chaining cycle detected for promise #<Promises>')
						// }
						// // 判断之前的promise返回的是否还是一个promise
						// if(x instanceof MyPromise) {
						//   // x.then(res => { console.log(res) }, err => { console.log(err) })
						//   x.then(res => { resolve(res) }, err => { reject(err) })
						// } else {
						//   resolve(x)
						// }
					} catch (err) {
						reject(err);
					}
				});
			} else if (this.state === MyPromise.REJECTED) {
				runAsynctask(() => {
					// 1. 捕获错误
					try {
						// 2. 获取返回值
						const x = onRejected(this.result);
						resolvePromise(p2, x, resolve, reject);
					} catch (err) {
						reject(err);
					}
				});
			} else if (this.state === MyPromise.PENDING) {
				this.#handlers.push({
					onFulfilled: () => {
						runAsynctask(() => {
							try {
								const x = onFulfilled(this.result);
								resolvePromise(p2, x, resolve, reject);
							} catch (err) {
								reject(err);
							}
						});
					},
					onRejected: () => {
						runAsynctask(() => {
							try {
								const x = onRejected(this.result);
								resolvePromise(p2, x, resolve, reject);
							} catch (err) {
								reject(err);
							}
						});
					},
				});
			}
		});
		return p2;
	};
	catch = (onRejected) => {
		return this.then(undefined, onRejected);
	};
	finally(fn) {
		return this.then(fn, fn);
	}

	static resolve = (result) => {
		if (result instanceof MyPromise) {
			return result;
		}
		return new MyPromise((resolve) => {
			resolve(result);
		});
	};

	static reject = (result) => {
		return new MyPromise((undefined, reject) => {
			reject(result);
		});
	};

	static race = (promises) => {
		return new MyPromise((resolve, reject) => {
			if (!Array.isArray(promises)) {
				return reject(new TypeError("Argument is not iterable"));
			}
			// 等待第一个敲定
			promises.forEach((p) => {
				MyPromise.resolve(p).then(
					(res) => {
						resolve(res);
					},
					(err) => {
						reject(err);
					}
				);
			});
		});
	};

	static all = (promises) => {
		return new MyPromise((resolve, reject) => {
			if (!Array.isArray(promises)) {
				return reject(new TypeError("Argument is not iterable"));
			}
			promises.length === 0 && resolve(promises);
			const results = [];
			let count = 0;
			promises.forEach((p, index) => {
				MyPromise.resolve(p).then(
					(res) => {
						count++;
						results[index] = res;
						count === promises.length && resolve(results);
					},
					(err) => {
						reject(err);
					}
				);
			});
		});
	};

	static allSettled = (promises) => {
		return new MyPromise((resolve, reject) => {
			if (!Array.isArray(promises)) {
				return reject(new TypeError("Argument is not iterable"));
			}
			promises.length === 0 && resolve(promises);
			const results = [];
			let count = 0;
			promises.forEach((p, index) => {
				console.log("p", p);
				MyPromise.resolve(p).then(
					(res) => {
						count++;
						results[index] = {
							status: "fulfilled",
							value: res,
						};
						count === promises.length && resolve(results);
					},
					(err) => {
						count++;
						results[index] = {
							status: "rejected",
							reason: err,
						};
						count === promises.length && resolve(results);
					}
				);
			});
		});
	};

	static any = (promises) => {
		return new MyPromise((resolve, reject) => {
			if (!Array.isArray(promises)) {
				return reject(new TypeError("Argument is not iterable"));
			}
			promises.length === 0 &&
				reject(new AggregateError(promises, "All promises were rejected"));
			const errors = [];
			let count = 0;
			promises.forEach((p, index) => {
				MyPromise.resolve(p).then(
					(res) => {
						resolve(res);
					},
					(err) => {
						errors[index] = err;
						count++;
						count === promises.length &&
							reject(new AggregateError(errors, "All promises were rejected"));
					}
				);
			});
		});
	};
}

// 抽取函数 处理不同返回内容的函数
function resolvePromise(p2, x, resolve, reject) {
	if (x === p2) {
		throw new TypeError("Chaining cycle detected for promise #<Promises>");
	}
	// 判断之前的promise返回的是否还是一个promise
	if (x instanceof MyPromise) {
		// x.then(res => { console.log(res) }, err => { console.log(err) })
		x.then(
			(res) => {
				resolve(res);
			},
			(err) => {
				reject(err);
			}
		);
	} else {
		resolve(x);
	}
}

// 异步任务
function runAsynctask(callback) {
	if (typeof queueMicrotask === "function") {
		queueMicrotask(callback);
	} else if (typeof MutationObserver === "function") {
		const obs = new MutationObserver(callback);
		const dom = document.createElement("div");
		obs.observe(dom, { childList: true });
		dom.innerHTML = "1";
		document.removeChild(dom);
	} else {
		setTimeout(callback, 0);
	}
}

// 普通调用
// const p = new MyPromise((resolve, reject) => {
//   resolve('success')
//   // reject('err')
// })

// p.then(res => {
//   console.log('成功回调', res)
// }, err => {
//   console.log('失败回调', err)
// })
// p.then()

// 异步调用和多次调用
// const p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('success')
//     reject('error')
//   }, 2000)
// })

// p.then(res => {
//   console.log('then1', res)
// }, err => {
//   console.log('then1', err)
// })

// p.then(res => {
//   console.log('then2', res)
// }, err => {
//   console.log('then2', err)
// })

// 异步任务
// 核心api vue2: Promise.then, MutationObserver, setImmediate, setTimeout
// 选用: queueMicrotask, MutationObserver, setTimeout

// console.log('top')
// const p = new MyPromise((resolve, reject) => {
//   reject('error')
//   // setTimeout(() => {
//   //   resolve('success')
//   //   console.log('a1000')
//   // }, 1000)
// })
// p.then(res => {
//   console.log(res)
// })
// console.log('bottom')

// 演示queueMicrotask和MutationObserver
// console.log('1')
// const dom = document.createElement('div')
// const obs = new MutationObserver(() => {
//   console.log('MutationObserver')
// })
// obs.observe(dom, { childList: true })
// setTimeout(() => {
//   console.log('setTimeout')
// })
// queueMicrotask(() => {
//   console.log('queueMicrotask')
// })
// dom.innerHTML = '变化'

// console.log('2')

// 链式编程
// 返回新的promise实例
// const p = new MyPromise((resolve, reject) => {
//   resolve(1)
// })
// p.then(res => {
//   console.log('p1', res)
//   throw 'throw error'
//   return 2
// }).then(res => {
//   console.log('p2', res)
// }, err => {
//   console.log('p3', err)
// })
// const p = new MyPromise((resolve, reject) => {
//   resolve(1)
// })
// p.then(res => {
//   return new MyPromise((resolve, reject) => {
//     resolve(2)
//     // reject('error')
//   })
// }).then(res => {
//   console.log('p2', res) // 2
// }, err => {
//   console.log('p2', err) // error
// })

// 重复引用
// const p = new MyPromise((resolve, reject) => {
//   resolve(1)
// })
// const p2 = p.then(res => {
//   return p2
// })
// p2.then(
//   res => { },
//   err => console.log('err', err)
// )

// 处理支持链式的rejected状态
// const p = new MyPromise((resolve, reject) => {
//   reject(1)
// })
// const p2 = p.then(undefined, err => {
//   // throw 'error'
//   // return p2
//   // return 2
//   return new MyPromise((resolve, reject) => {
//     //  resolve('MyPromise-2')
//      reject('MyPromise-2')
//   })
// })
// p2.then(res => {
//   console.log('p2-res: ', res)
// }, err => {
//   console.log('p2-err: ', err)
// })

// 处理支持链式的pending状态
// const p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 2000)
// })
// const p2 = p.then(res => {
//   // throw 'error'
//   // return p2
//   // return 2
//   return new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('resolve-2')
//       // reject('reject-2')
//     })
//   })
// })

// p2.then(res => {
//   console.log('p2-res', res)
// }, err => {
//   console.log('p2-err', err)
// })

// const p = new MyPromise((resolve, reject) => {
//   // reject('reject-error')
//   throw 'throw-error'
// })
// p.then(res => {
//   console.log('res', res)
// }).catch((err) => {
//   console.log('err', err)
// }).finally(() => {
//   console.log('finally')
// })
// 静态方法resolve
// MyPromise.resolve(new MyPromise((resolve, reject) => {
//   // resolve('resolve')
//   reject('reject')
// })).then(res => {
//   console.log('res: ', res)
// }, err => {
//   console.log('err', err)
// })

// MyPromise.resolve('yk').then(res => {
//   console.log(res)
// })

// 静态方法reject
// MyPromise.reject('error').catch(res => {
//   console.log(res)
// })
// const p1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 2000)
// })

// const p2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject(2)
//   }, 3000)
// })

// // , 'yk'
// MyPromise.race([p1, p2]).then((res) => {
//   console.log('res', res)
// }, err => {
//   console.log('err', err)
// })
// const p1 = MyPromise.resolve(1)
// const p2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve(2)
//     reject(2)
//   }, 1000)
// })
// const p3 = 3

// MyPromise.all([p1, p2, p3]).then(res => {
//   console.log('res: ', res)
// }, err => {
//   console.log('err: ', err)
// })
// const p1 = MyPromise.resolve(1)
// const p2 = 2
// const p3 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject(3)
//   }, 1000)
// })

// MyPromise.allSettled([p1, p2, p3]).then(res => {
//   console.log('res: ', res)
// }, err => {
//   console.log('err', err)
// })
const p1 = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		reject(1);
	}, 2000);
});

// const p2 = 2
const p2 = MyPromise.reject(2);

const p3 = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		// resolve(3)
		reject(3);
	}, 1000);
});

// 不传参数: TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))
// 全都reject: AggregateError: All promise were rejected -> errors/message: All promises were rejected/stack:  AggregateError: All promise were rejected
// p1, p2, p3
MyPromise.any([p1, p2, p3]).then(
	(res) => {
		console.log("res: ", res);
	},
	(err) => {
		console.dir(err);
	}
);
