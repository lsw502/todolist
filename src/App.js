import React from 'react';
import './App.css';
import { useState } from "react"


function App() {
  //제목
  const [title, setTitle] = useState("");
  //내용
  const [content, setContent] = useState("");
  //투두리스트
  const [todo, setTodo] = useState([]);
  const [doneTodo, setDoneTodo] = useState([]);
  //추가하기,투두리스트
  const clickAddButtonHandler = () => {
    const newTodo = {
      id: Date.now(),
      title: title,
      content: content,
      isDone: false,
    }
    setTodo([...todo, newTodo]);
    setTitle("");
    setContent("");
  }
  const titleChangeHandler = (e => {
    setTitle(e.target.value)
  });
  const contentChangeHandler = (e => {
    setContent(e.target.value)
  })
  // working 삭제하기
  const clickRemoveButtonHandler = (id) => {
    setTodo(todo.filter(item => item.id !== id))
  };
  // working 저장
  const handlerDone = (Did) => {
    const newDone = {
      id: Did.id,
      title: Did.title,
      content: Did.content,
      isDone: true,
    }
    setDoneTodo([...doneTodo, newDone])
    setTodo(todo.filter(item => item.id !== Did.id))
  };

  // Done 삭제하기
  const doneRemoveBtn = (id) => {
    setDoneTodo(doneTodo.filter(item => item.id !== id))
  }

  // Done 수정
  const doneCancelBtn = ((cid) => {
    const newCTodo = {
      id: cid.id,
      title: cid.title,
      content: cid.content,
      isDone: false,
    }
    setTodo([...todo, newCTodo])
    setDoneTodo(doneTodo.filter(item => cid.id !== item.id))
  })

  const todoHandler = (item) => {
    if (item.isDone === false) {
      // working 구역
      return (
        <div className="card">
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          <button onClick={() => clickRemoveButtonHandler(item.id)} className="box1_delete">삭제하기</button>
          <button onClick={() => handlerDone(item)} className="box1_complete">저장</button>
        </div>
      )
    } else {
      // Done 구역
      return (
        <div className="card">
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          <button onClick={() => doneRemoveBtn(item.id)} className="box1_delete">삭제하기</button>
          <button onClick={() => doneCancelBtn(item)} className="box1_complete">수정</button>
        </div>
      )
    }
  };

  const workingCardList = todo.map(item => {
    return todoHandler(item)
  })

  const doneCardList = doneTodo.map(item => {
    return todoHandler(item)
  })




  return (

    <div className="main">
      {/* 헤더 */}
      <div className="title">
        <h2>My ToDo List</h2>
        <h3>React</h3>
      </div>
      {/* 제목 입력 */}
      <div className="titleInput">
        <p>제목</p>
        <input
          type="text"
          value={title}
          onChange={titleChangeHandler}
        />
        {/* 내용 입력 */}
        <p>내용</p>
        <input
          type="text"
          value={content}
          onChange={contentChangeHandler}
        />
        {/* 추가하기 버튼 */}
        <button onClick={clickAddButtonHandler}>추가하기</button>
      </div>

      <div className="working">
        <h2>Working..🔥</h2>
      </div>
      {/* 투두리스트 카드 등록 */}
      <div className="box1">
        {workingCardList}
      </div>

      <div className="done">
        <h2>Done..!🎉</h2>
      </div>
      {/* 투두리스트 카드 수정 */}
      <div className="box2">
        {doneCardList}
      </div>

    </div>

  );
}

export default App;
