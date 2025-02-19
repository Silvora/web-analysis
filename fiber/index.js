import React from "react";

// let ele = (
//     <div id="A">
//         <div id="B1">
//             <h1 id="C1">hello</h1>
//             <h2 id="C2">world</h2>
//         </div>
//         <div id="B2">
//             <h1 id="C3">hello</h1>
//             <h2 id="C4">world</h2>
//         </div>
//     </div>
// );

const ele = React.createElement(
    "div",
    { id: "A" },
    React.createElement(
        "div",
        { id: "B1" },
        React.createElement("h1", { id: "C1" }, "hello"),
        React.createElement("h2", { id: "C2" }, "world")
    ),
    React.createElement(
        "div",
        { id: "B2" },
        React.createElement("h1", { id: "C3" }, "hello"),
        React.createElement("h2", { id: "C4" }, "world")
    )
);



let FiberNode = {
  // 表示当前FiberNode对应的element组件实例
  stateNode: null,

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
}


console.log(FiberNode);