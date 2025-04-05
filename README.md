한 입 크기로 잘라 먹는 리액트 (React study project)

JavaScript + React + HTML + CSS

useState: component의 상태를 관리하기 위한 hook. 상태 값이 바뀌면 컴포넌트가 리렌더링 됨.
  ex) 버튼 클릭 시 숫자 증가/감소 등 간단한 상태변경에 사용
  
useRef: DOM요소에 직접 접근하거나, 리렌더링 없이 값을 유지할 때 사용하는 hook
  ex) focus제어, 이전 값 저장 등
  
useReducer: 복잡한 형태의 로직을 다룰 때 사용하는 hook. reducer 함수와 함께 상태를 관리. useState보다 명확한 흐름을 만들 수 있음.
  ex) 폼 입력값, 상태가 여러 가지로 나뉘는 경우.
  
useMemo: 연산 비용이 큰 계산 결과를 메모이제이션하여, 의존성이 바뀔 때만 재계산하도록함. 불필요한 연산을 줄여 성능을 최적화할 때 사용.
  ex) 정렬, 필터 등 무거운 계산 결과를 캐싱.
  
useCallback: 함수를 메모이제이션하여, 컴포넌트가 리렌더링 되더라도 동일한 함수 인스턴스를 유지함. 주로 자식 컴포넌트에 props로 함수를 전달할 때 사용해 렌더링을 최적화.
  ex) 자식 컴포넌트에 콜백 전달 시 함수 재생성 방지.
  
React.memo: 고차 컴포넌트(HOC)로, props가 바뀌지 않으면 리렌더링을 막아주는 최적화 기법. props가 동일하면 이전 렌더링 결과를 재사용.
  ex) 동일한 props를 받는 자식 컴포넌트가 불필요하게 리렌더링되는 것을 방지할 때 사용

React.memo VS useCallback
React.memo는 props 변경 여부를 기준으로 렌더링 여부를 판단.
useCallback은 부모 컴포넌트에서 함수를 props로 전달할 경우 사용하지 않으면 매번 새로운 함수가 생성되어 리렌더링이 발생.
