import { act, useReducer, useState } from "react";

// useReducer(): useState()와 더불어 리액트 컴포넌트에서 State를 관리하는 리액트 훅.
// State관리를 컴포넌트 내부가 아닌 외부에서 할 수 있게 만든다.
// 그래서 useState()와 달리 State를 관리하는 상태 변화 코드를 컴포넌트와 분리 가능.

const reducer = (state, action) => {
    switch(action.type) {
        case "INIT":
            return 0;
        case "INCREASE": 
            return state + action.data;
        case "DECREASE":
            return state - action.data;
        default: 
            return state;
    }
}

const TestComp = () => {
    const [count, dispatch] = useReducer(reducer, 0);

    return (
        <div className="TestComp">
            <h4>Test Component</h4>
            <div>
                <bold>{count}</bold>
            </div>
            <button onClick={() => dispatch({ type: "INIT" })}>초기화</button>
            <button onClick={() => dispatch({ type: "INCREASE", data: 1 })}>+</button>
            <button onClick={() => dispatch({ type: "DECREASE", data: 1 })}>-</button>
        </div>
    )
}

export default TestComp;