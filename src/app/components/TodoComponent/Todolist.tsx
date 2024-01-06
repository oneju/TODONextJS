"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import TodoComponent from "./TodoComponent";

const TodoList = () => {
  const getTodos = async () => {
    const { data } = await axios.get("/api/todo");
    return data;
  };
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos }).data;

  return (
    <div>
      <ul>
        {query &&
          query.map((todo: any) => (
            <TodoComponent
              key={todo.id}
              id={todo.id}
              content={todo.content}
              checked={todo.checked ? "true" : "false"}
            />
          ))}
      </ul>
    </div>
  );
};
export default TodoList;
