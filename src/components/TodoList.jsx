import "./TodoList.css";
import TodoItem from "./TodoItem";
import { useState, useMemo } from "react";

const TodoList = ({ todo, onUpdate, onDelete }) => {
    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const getSearchResult = () => {
        return search === "" ? todo : todo.filter((it) => it.content.toLowerCase().includes(search.toLowerCase()));
    }

    // const analyzeTodo = () => {
    //     console.log("analyzeTodo() 함수 호출");
    //     const totalCount = todo.length;
    //     const doneCount = todo.filter((it) => it.isDone).length;
    //     const notDoneCount = totalCount - doneCount;
    //     return {
    //         totalCount,
    //         doneCount,
    //         notDoneCount,
    //     };
    // };
    // const { totalCount, doneCount, notDoneCount } = analyzeTodo();

    /* useMemo: useMemo를 호출하고 첫 번째 인수로 메모이제이션하려는 콜백함수 전달. 이 함수는 두 번째 인수로 전달할
    의존성 배열의 값이 변하지 않는 한 다시 호출되지 않음.
    만약 두 번째 인수의 값이 변하게 되면 콜백 함수를 다시 호출해서 변경된 값을 변수에 다시 저장함. */
    const analyzeTodo = useMemo(() => {
        // console.log("analyzeTodo() 함수 호출");
        const totalCount = todo.length;
        // todo.filter((it) => it.isDone) -> isDone 이 true 인 것만 모은 새로운 배열
        const doneCount = todo.filter((it) => it.inDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    }, [todo]);
    const {totalCount, doneCount, notDoneCount} = analyzeTodo;

    return (
        <div className="TodoList">
            <h4>Todo List 🌱</h4>
            <div>
                <div>Total todo: {totalCount}</div>
                <div>Finished todo: {doneCount}</div>
                <div>Unfinished todo: {notDoneCount}</div>
            </div>
            <input value={search} onChange={onChangeSearch} className="searchbar" placeholder="검색어를 입력해주세요 !" />
            <div className="list_wrapper">
                {getSearchResult().map((it) => (
                    <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete} />
                ))}
            </div>
        </div>
    )
}

export default TodoList;