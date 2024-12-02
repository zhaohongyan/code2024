// 泛型
// Generic Functions
function firstElement<Type>(arr: Type[]): Type | undefined {
	return arr[0];
}

// interface
function map<Input, Output>(
	arr: Input[],
	fn: (arr: Input) => Output
): Output[] {
	return arr.map(fn);
}
// constrains 约束条件
function longtest<Type extends { length: number }>(a: Type, b: Type) {
	if (a.length > b.length) {
		return a;
	}
	return b;
}

interface NumberDictionary {
	[index: string]: number | string;

	length: number; // ok
	name: string;
	//   Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}

function identify<Type>(arg: Type): Type {
	return arg;
}

// let myIdentify: <Type> (arg: Type) => Type = identify;

// let myIdentify: <Input>(arg: Input) =>  Input = identify;

let myIdentify: { <Type>(arg: Type): Type } = identify;

// Record<Keys, Type>
type CatName = "miffy" | "boris" | "mordred";
interface CatInfo {
	age: number;
	breed: string;
}

const cats: Record<CatName, CatInfo> = {
	miffy: {
		age: 10,
		breed: "1",
	},
	boris: {
		age: 10,
		breed: "1",
	},
	mordred: {
		age: 10,
		breed: "1",
	},
};
// Pick<Type, keys>
interface Todo {
	title: string;
	description: string;
	completed: boolean;
}

type TodoPreview1 = Pick<Todo, "title" | "completed">;
const todo1: TodoPreview1 = {
	title: "1",
	completed: true,
};
// Omit<Type, keys>
type TodoPreview2 = Omit<Todo, "description">;
const todo2: TodoPreview2 = {
	title: "1",
	completed: true,
};
// keyof typeof
type Point = {
	x: number;
	y: number;
};
type P = keyof Point; // 'x' | 'y'

let s = "hello";
let n: typeof s = "nnn";
