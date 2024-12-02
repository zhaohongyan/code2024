const root = {
	key: "A1",
	children: [
		{
			key: "B1",
			children: [
				{
					key: "C1",
					children: [],
				},
				{
					key: "C2",
					children: [],
				},
			],
		},
		{
			key: "B2",
			children: [
				{
					key: "C3",
					children: [],
				},
				{
					key: "C4",
					children: [],
				},
			],
		},
	],
};

// 深度遍历
function walk(node) {
	console.log(node.key)
	if (node.children && node.children.length > 0) {
		node.children.forEach(ele => {
			walk(ele)
		});
	}
}

walk(root)

