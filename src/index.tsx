// import { someFunc } from "./test";

// someFunc(5);

// document.body.innerHTML = `<div>HELLO</div>`
// import React from "react";
import { render } from "react-dom";
import { Counter } from "./components/Counter";

render(<div><Counter /></div>,

    document.getElementById('root'))