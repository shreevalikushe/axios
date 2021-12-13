import axios from "axios";
import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import { v4 as uuid } from "uuid";

function Todo() {
  const [todo, setTodo] = useState([]);

  const onSubmit = ({ title }) => {
    const payload = {
      id: uuid(),
      title,
      status: false,
    };
    setTodo([...todo, payload]);
    postTask(payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    getTodos();
  };
  function postTask(datas) {
    const config = {
      url: "http://localhost:8000/tasks",
      method: "post",
      data: datas,
    };
    return axios(config);
  }
  function getTodos() {
    const config = {
      url: "http://localhost:8000/tasks",
      method: "get",
    };
    return axios(config);
  }
  useEffect(() => {
    getTodos()
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteTask = (e) => {
    const deleteTask = todo.filter((item) => item.id !== e);
    // console.log(deleteTask);
    setTodo(deleteTask);
  };
  const toggleTask = (e) => {
    const toggleTask = todo.map((item) =>
      item.id === e ? { ...item, status: !item.status } : item
    );
    setTodo(toggleTask);
    // console.log(toggleTask);
  };
  return (
    <>
      <>
        <h3>Todo with axios and mock server</h3>
        <TodoInput onSubmit={onSubmit} />
        {todo.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "auto",
                width: "400px",
                border: "1px solid black",
                marginTop: "1rem",
                padding: "0.5rem",
                backgroundColor: "red",
              }}
            >
              <h3>
                {item.title}- {item.status ? "DONE" : "NOT DONE"}
              </h3>
              <button
                style={{ height: "5%" }}
                onClick={() => deleteTask(item.id)}
              >
                Delete task
              </button>
              <button
                style={{ height: "5%" }}
                onClick={() => toggleTask(item.id)}
              >
                Toggle Status
              </button>
            </div>
          );
        })}
      </>
    </>
  );
}
export default Todo;
