const wait = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject("error message");
		}, 1000);
	});
};

// Promise
// wait.then(() => {
//     console.log('then')
// }).catch(() => {
//     console.log('catch error')
// }).finally(() => {
//     console.log('finally')
// })


async function fn1 () {
	try {
		await wait();
	} catch (error) {
		console.log("error:", error);
	}
};
fn1();

const fn2 = async () => {
    await wait().catch(() => {
        console.log('await catch') // 这里可以捕获到错误的
    })
}

fn2()
