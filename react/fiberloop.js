import rootFiber from './element.js'


const beginWork = (Fiber) => {
  console.log(`${Fiber.key} start`)
}

const completeUnitWork = (Fiber) => {
  console.log(`${Fiber.key} end`)
}

// 遍历函数
const performUnitOfWork = (Fiber) => {
  beginWork(Fiber)
  if (Fiber.child) {
    return Fiber.child
  }
  while (Fiber) {
    completeUnitWork(Fiber)
    if (Fiber.sibling) {
      return Fiber.sibling
    }
    Fiber = Fiber.return
  }
}

const workloop = (nextUnitOfWork) => {
  // 如果有待执行的执行单元则执行，返回下一个执行单元
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  if (!nextUnitOfWork) {
    console.log('reconciliation阶段结束')
  }
}

workloop(rootFiber)
