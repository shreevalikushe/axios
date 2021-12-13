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

  return (
    <>
      <>
        <h3>Todo with axios and mock server</h3>
        <TodoInput onSubmit={onSubmit} />
        {todo.map((item) => {
          return (
            <div key={item.id}>
              <h3>
                {item.title}- {item.status ? "DONE" : "NOT DONE"}
              </h3>
            </div>
          );
        })}
      </>
    </>
  );
}
export default Todo;
