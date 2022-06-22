import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import toast, { Toaster } from "react-hot-toast";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    toast.success("Added New Activity!", {
      duration: 2000,
      position: "top-right",
      style: {
        backgroundColor: "#1abc9c",
        color: "#fff",
      },
    });

    setTodos(newTodos);
    // console.log(todo, ...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );

    toast.success("Updated!", {
      duration: 2000,
      position: "top-right",
      style: {
        backgroundColor: "#1abc9c",
        color: "#fff",
      },
    });
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);

    toast.error("Bye-bye :(", {
      duration: 2000,
      position: "top-right",
      style: {
        backgroundColor: "#F47C7C",
        color: "#fff",
      },
    });

    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;

        if (todo.isComplete) {
          toast.success("Yay! Keep Productive Buddy!", {
            duration: 2000,
            position: "top-right",
            icon: "👏",
            style: {
              backgroundColor: "#1abc9c",
              color: "#fff",
            },
          });
        } else {
          toast.success("Keep the spirit alive!", {
            duration: 2000,
            position: "top-right",
            icon: "🔥",
            style: {
              backgroundColor: "#FF7396",
              color: "#fff",
            },
          });
        }
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Hey Buddy, Whats plan for today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      <Toaster />
    </div>
  );
}

export default TodoList;
