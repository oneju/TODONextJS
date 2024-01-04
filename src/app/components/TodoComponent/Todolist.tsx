"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import TodoComponent from "./TodoComponent";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const getTodos = async () => {
    const { data } = await axios.get("/api/todo");
    return data;
  };
  const postTodo = async () => {
    await axios.post("/api/todo", {
      headers: { "Content-Type": "application/json" },
      data: newTodo,
    });
    setNewTodo("");
  };
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos }).data;
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["addTodo"] });
    },
  });

  return (
    <div>
      <ul>
        {query &&
          query.map((todo: any) => (
            <TodoComponent key={todo.id} content={todo.content} />
          ))}
      </ul>
      <input
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
        placeholder="new todo content"
      />
      <button
        onClick={() => {
          mutation.mutate();
        }}
      >
        Add Todo
      </button>
    </div>
  );
};
export default TodoList;
