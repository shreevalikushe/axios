import { useState } from "react";

function TodoInput({ onSubmit }) {
  const [task, setTask] = useState({
    title: "",
  });
  const handleInput = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    onSubmit(task);
  };
  return (
    <>
      <input
        placeholder="Add task here"
        value={setTask.title}
        onChange={handleInput}
        name="title"
      />
      <button onClick={handleSubmit}>ADD</button>
    </>
  );
}
export default TodoInput;
