"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoList from "../../components/TodoComponent/Todolist";
import NewTodo from "../../components/TodoComponent/NewTodo";
import styled from "@emotion/styled";
import TodoHeader from "../../components/TodoComponent/TodoHeader";

const Todo = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TodoPage>
        <Size>
          <TodoHeader />
          <TodoList />
          <NewTodo />
        </Size>
      </TodoPage>
    </QueryClientProvider>
  );
};
export default Todo;
const TodoPage = styled.main`
  height: 100%;
  width: 100vw;
  @media (min-width: 960px) {
    width: 900px;
    margin: auto;
  }
`;
const Size = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
