let str = 'aaaebbbfcccccfg'

const obj = {}
let max = 1;
let maxStr = '';
for (let index = 0; index < str.length; index++) {
    const element = str[index];
    if (!obj[element]) {
        obj[element] = 1
    } else {
        obj[element] = obj[element] + 1
        if (obj[element] > max) {
            max = obj[element]
            maxStr = element;
        }
    }
}

console.log(obj, max, maxStr)