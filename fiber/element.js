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
        React.createElement("div", { id: "C1" }),
        React.createElement("div", { id: "C2" })
    ),
    React.createElement(
        "div",
        { id: "B2" },
        React.createElement("div", { id: "C3" }),
        React.createElement("div", { id: "C4" })
    )
);



export default ele;