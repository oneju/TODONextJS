"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoList from "../components/TodoComponent/Todolist";

const Todo = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  );
};
export default Todo;
