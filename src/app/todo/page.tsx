"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoList from "../components/TodoComponent/Todolist";
import NewTodo from "../components/TodoComponent/NewTodo";
import styled from "@emotion/styled";
import TodoHeader from "../components/TodoComponent/TodoHeader";

const Todo = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TodoHeader />

      <TodoPage>
        <TodoList />
        <NewTodo />
      </TodoPage>
    </QueryClientProvider>
  );
};
export default Todo;
const TodoPage = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
`;
