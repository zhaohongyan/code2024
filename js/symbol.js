// keys()
const mySet = new Set();
mySet.add("foo");
mySet.add("bar");
mySet.add("baz");
const setIter = mySet.keys();
console.log(setIter.next().value); // "foo"
console.log(setIter.next().value); // "bar"
console.log(setIter.next().value); // "baz"

// values()
const set1 = new Set();
set1.add(42);
set1.add("forty two");
const iterator1 = set1.values();
console.log(iterator1.next().value);
console.log(iterator1.next().value);

// entries()
const set1 = new Set();
set1.add(42);
set1.add("forty two");
const iterator1 = set1.entries();
for (const entry of iterator1) {
	console.log(entry);
}

// forEach
new Set(["foo", "bar", undefined]).forEach((v1, v2) => {
    console.log(v1, v2)
});

// intersection 交集 
const odds = new Set([1, 3, 5, 7, 9]);
const squares = new Set([1, 4, 9]);
console.log(odds.intersection(squares)); // Set(2) { 1, 9 }

// difference 差集
const odds = new Set([1, 3, 5, 7, 9]);
const squares = new Set([1, 4, 9]);
console.log(odds.difference(squares)); // Set(3) { 3, 5, 7 }

// union 并集
const evens = new Set([2, 4, 6, 8]);
const squares = new Set([1, 4, 9]);
console.log(evens.union(squares)); // Set(6) { 2, 4, 6, 8, 1, 9 }

// isDisjointFrom 不相关
const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19]);
const squares = new Set([1, 4, 9, 16]);
console.log(primes.isDisjointFrom(squares)); // true

// isSubsetOf
const fours = new Set([4, 8, 12, 16]);
const evens = new Set([2, 4, 6, 8, 10, 12, 14, 16, 18]);
console.log(fours.isSubsetOf(evens)); // true

// isSupersetOf
const evens = new Set([2, 4, 6, 8, 10, 12, 14, 16, 18]);
const fours = new Set([4, 8, 12, 16]);
console.log(evens.isSupersetOf(fours)); // true
