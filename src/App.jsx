import "./App.css";
import React, { useState, useEffect } from "react";

const url = "https://backend-todo-app-nmm6.onrender.com";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = async () => {
    const data = await fetch(`${url}/todos`);
    const json = await data.json();
    setTodos(json);
    // console.log(todos);
  };

  const handleAdd = async () => {
    try {
      const res = await fetch(`${url}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await res.json();
      getTodos();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async ({ id }) => {
    try {
      // const id = todo._id;
      const res = await fetch(`${url}/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async ({ id }) => {
    try {
      const res = await fetch(`${url}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await res.json();
      getTodos();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className=" text-center text-4xl">Minimalistic Todo App</div>;
      {/* Body */}
      <div className="flex flex-row ">
        {/* Left Part to show todos */}
        <div className="w-3/6">
          {todos && (
            <div className="flex flex-col border">
              {todos.map((todo, index) => {
                return (
                  <div
                    key={index}
                    className="border flex flex-row items-center space-x-2 mx-5 my-1 px-2 "
                  >
                    <span className="text-xl">{index + 1}.</span>
                    <span className="text-xl">Title: {todo?.title},</span>
                    <span className="text-xl">
                      Description: {todo?.description}
                    </span>

                    <button
                      className="border mx-1 p-1 rounded-lg bg-red-300 "
                      onClick={() => handleEdit({ id: todo._id })}
                    >
                      Edit
                    </button>
                    <button
                      className="border mx-1 p-1 rounded-lg bg-red-300 "
                      onClick={() => handleDelete({ id: todo._id })}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Part to create todos  */}
        <div className="border w-3/6 flex flex-col items-center space-y-4 m-4 p-2">
          <div>
            <span>Title: </span>
            <input
              className="border m-1 px-1"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <span>Description: </span>
            <input
              className="border m-1 px-1"
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <button
            className="m-2 px-4 rounded-lg bg-green-200"
            onClick={() => handleAdd()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
