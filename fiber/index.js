import ele from "./element";
const root = document.getElementById("root");


console.log(ele);

let FiberNode = {
  // 表示当前FiberNode对应的element组件实例
  stateNode: root,

  // 表示当前FiberNode的类型
  type: ele.type,

  // 表示当前FiberNode的props
  props: {
    children: [ele],
  },

  // 指向他在Fiber节点树中的`parent`，用来在处理完这个节点之后向上返回
  return: null,
  // 指向自己的第一个子节点
  child: null,
  // 指向自己的兄弟结构，兄弟节点的return指向同一个父节点
  sibling: null,

  // Effect
  // 用来记录Side Effect
  effectTag: null,

  // 单链表用来快速查找下一个side effect
  nextEffect: null,

  // 子树中第一个side effect
  firstEffect: null,
  // 子树中最后一个side effect
  lastEffect: null,
};

let nextUnitOfWork = FiberNode; // 下一个工作单元


function completeUnitOfWork(fiber) {
    console.log("completeUnitOfWork",fiber.props.id);
  // 递归完成子树的fiber
  let child = fiber.return;

  if (child) {
    if (!child.firstEffect) {
      child.firstEffect = fiber.firstEffect;
    }
    if (fiber.lastEffect) {
        if (child.lastEffect) {
            child.lastEffect.nextEffect = fiber.firstEffect;
        }
      child.lastEffect = fiber.lastEffect;
    }
    if (fiber.effectTag) {
        if(child.lastEffect){
            child.lastEffect.nextEffect = fiber;
        }else{
            child.firstEffect = fiber;
        }
        child.lastEffect = fiber;
    }
  }
}

function beginWork(fiber) {
console.log("beginWork",fiber.props.id);
  // 递归完成子树的fiber
  if(!fiber.stateNode){
    fiber.stateNode = document.createElement(fiber.type);
    for (let name in fiber.props) {
        if(name !== "children"){
            fiber.stateNode[name] = fiber.props[name];
        }
    }
  }

  let previousFiber  = null

  fiber.props.children && fiber.props.children.forEach((child,index) => {
    
    
    const childFiber = {
      type: child.type,
      props: child.props,
      return: fiber,
      effectTag: "PLACEMENT", // 插入 对应fiber的DOM节点操作
      nextEffect: null, // 下一个副作用节点
    //   firstEffect: null, // 子树中第一个side effect
    //   lastEffect: null, // 子树中最后一个side effect
    };

    index === 0 ? fiber.child = childFiber : previousFiber.sibling = childFiber;

    previousFiber = childFiber


  });

}

function performUnitOfWork(fiber) {
    // 创建真实dom 并没有挂载 并创建fiber子树
  beginWork(fiber);

  // 递归完成子树的fiber 找儿子
  if (fiber.child) {
    return fiber.child;
  }
  // 没有儿子, 找弟弟
  while (fiber) {
    completeUnitOfWork(fiber);
    if (fiber.sibling) {
      return fiber.sibling;
    }
    fiber = fiber.return;
  }
}


function commitRoot() {
    let firstEffect = FiberNode.firstEffect;
    while (firstEffect) {
        console.log("commitRoot",firstEffect);
        if (firstEffect.effectTag === "PLACEMENT") {
            const parentFiber = firstEffect.return;
            parentFiber.stateNode.appendChild(firstEffect.stateNode);
        }
        firstEffect = firstEffect.nextEffect;
    }

    FiberNode = null
}

function workLoop(deadline) {
  // 有当前工作单元,就执行,并返回下一个工作单元
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // 没有下一个工作单元 就提交 
  if (!nextUnitOfWork) {
    commitRoot();
  }

}

// requestIdleCallback 会在浏览器空闲时执行
requestIdleCallback(workLoop);


