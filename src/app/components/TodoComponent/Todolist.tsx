"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TodoComponent from "./TodoComponent";
import { useSession } from "next-auth/react";

const TodoList = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const getTodos = async () => {
    const { data } = await axios.post("/api/todo", {
      headers: { "Content-Type": "application/json" },
      data: {
        function: "read",
        userId: userId,
      },
    });
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
