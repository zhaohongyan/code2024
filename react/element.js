const A1 = { type: 'div', key: 'A1' }
const B1 = { type: 'div', key: 'B1', return: A1 }
const B2 = { type: 'div', key: 'B2', return: A1 }
const C1 = { type: 'div', key: 'C1', return: B1 }
const C2 = { type: 'div', key: 'C2', return: B1 }
const C3 = { type: 'div', key: 'C3', return: B2 }
const C4 = { type: 'div', key: 'C4', return: B2 }

A1.child = B1
B1.sibling = B2
B1.child = C1
C1.sibling = C2
B2.child = C3
C3.sibling = C4

export default A1;
