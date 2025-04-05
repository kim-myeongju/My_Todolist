import "./Header.css";
import React from "react";

const Header = () => {
    /* Header component는 날짜를 표시하는 단순한 기능만 수행하고 있기 때문에 리렌더링 될 필요가 없음
    따라서 React.memo로 감싸서 React.memo의 인수로 전달된 컴포넌트를 메모이제이션 컴포넌트로 만듬
    즉, React.memo가 반환하는 컴포넌트는 부모 컴포넌트에서 전달된 Props가 변경되지 않는 한 리렌더되지 않음 */
    return (
        <div className="Header">
            <h3>오늘은 🥰</h3>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
};

export default React.memo(Header);