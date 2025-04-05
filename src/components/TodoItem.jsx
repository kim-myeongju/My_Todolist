import "./TodoItem.css";
import React from "react";

const TodoItem = ({ id, content, isDone, createdDate, onUpdate, onDelete }) => {
    /* useCallback 함수로 onUpdate, onDelete를 재생성하지 않도록함
    onUpdate, onDelete함수는 App컴포턴트로부터 Props로 받아 내려온거라서 App컴포넌트가 리렌더되면 다시 생성되기 때문에
    React.memo는 저 함수들의 참조값이 바뀌었기 때문에 새롭게 생긴거라고 인식하여 리렌더를 해버리는 문제가 있어서. */

    console.log(`${id} TodoItem update`);

    const onChangeCheckBox = () => {
        onUpdate(id);
    }

    const onClickDelete = () => {
        onDelete(id);
    }

    return (
        <div className="TodoItem">
            <div className="checkbox_col">
                <input onChange={onChangeCheckBox} checked={isDone} type="checkbox" />
            </div>
            <div className="title_col">{content}</div>
            <div className="date_col">{new Date(createdDate).toLocaleDateString()}</div>
            <div className="btn_col">
                <button onClick={onClickDelete}>삭제</button>
            </div>
        </div>
    )
}

export default React.memo(TodoItem);