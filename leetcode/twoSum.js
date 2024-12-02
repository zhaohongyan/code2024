
function twoSum (arr, target) {
    const map = new Map();
    let result
    for (let i = 0; i < arr.length; i++) {
        if (map.has(target - arr[i])) {
            return [map.get(target-arr[i]), i]
        }
        map.set(arr[i], i)
    }
    if(!result) {
        return -1
    }
    return result
}

const result = twoSum([2, 7, 11, 15], 9)
console.log('twoSum===', result)