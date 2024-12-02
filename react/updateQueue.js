class Update {
	constructor(payload, nextUpdate) {
		this.payload = payload; // payload 数据
		this.nextUpdate = nextUpdate; // 指向下一个节点的指针
	}
}

class UpdateQueue {
	constructor() {
		this.baseState = null; // state
		this.firstUpdate = null; // 第一个更新
		this.lastUpdate = null; // 最后一个更新
	}

	enqueueUpdate(update) {
		// 当前链表是空链表
		if (!this.firstUpdate) {
			this.firstUpdate = this.lastUpdate = update;
		} else {
			// 当前链表不为空
			this.lastUpdate.nextUpdate = update;
			this.lastUpdate = update;
		}
	}

	// 获取state，然后遍历这个链表，进行更新
	forceUpdate() {
		let currentState = this.baseState || {};
		let currentUpdate = this.firstUpdate;
		while (currentUpdate) {
			// 判断是函数还是对象，是函数则需要执行，是对象则直接返回
			let nextState =
				typeof currentUpdate.payload === "function"
					? currentUpdate.payload(currentState)
					: currentUpdate.payload;
			currentState = { ...currentState, ...nextState };
			currentUpdate = currentUpdate.nextUpdate;
		}
		// 更新完成后清空链表
		this.firstUpdate = this.lastUpdate = null;
		this.baseState = currentState;
		return currentState;
	}
}

let queue = new UpdateQueue();
queue.enqueueUpdate(new Update({ name: "www" }));
queue.enqueueUpdate(new Update({ age: 10 }));
queue.enqueueUpdate(new Update((state) => ({ age: state.age + 1 })));
queue.enqueueUpdate(new Update((state) => ({ age: state.age + 1 })));
console.log(queue);

// queue.forceUpdate();
// console.log(queue.baseState);
