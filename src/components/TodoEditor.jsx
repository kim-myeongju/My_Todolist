import "./TodoEditor.css";
import { useState, useRef, useContext } from "react";
import { TodoDispatchContext } from "../App";

const TodoEditor = () => {
    const [content, setContent] = useState("");
    const inputRef = useRef();
    const { onCreate } = useContext(TodoDispatchContext);

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onSubmit = () => {
        if (!content) {
            inputRef.current.focus();
            return;
        }
        onCreate(content);
        setContent("");
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            onSubmit();
        };
    };

    return (
        <div className="TodoEditor">
            <h4>새로운 Todo 작성하기 🪄</h4>
            <div className="editor_wrapper">
                <input ref={inputRef} value={content} onChange={onChangeContent} onKeyDown={onKeyDown} placeholder="new todo..." />
                <button onClick={onSubmit}>추가</button>
            </div>
        </div>
    )
}

export default TodoEditor;