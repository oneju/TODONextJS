"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TodoComponent from "./TodoComponent";
import { useSession } from "next-auth/react";
import { todo } from "@/types/todo";
import styled from "@emotion/styled";
import Loading from "../Loading";
import palette from "@/styles/palette";

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
    const todos: todo[] = data.sort((a: todo, b: todo) => {
      const a_c = a.checked ? 1 : 0;
      const b_c = b.checked ? 1 : 0;
      return a_c - b_c;
    });
    return todos;
  };
  const { data: query, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <Todolist>
      <Count>
        남은 TODO {query?.filter((element) => !element.checked).length} 개
      </Count>
      <ListArea>

      {isLoading ? <Loading />:
      <ListContainer>
        {query &&
          query.map((todo: any) => (
            <TodoComponent
            key={todo.id}
            id={todo.id}
            content={todo.content}
            checked={todo.checked ? "true" : "false"}
            />
            ))}
      </ListContainer>}
      </ListArea>
    </Todolist>
  );
};
export default TodoList;
const Todolist = styled.div`
  width: 100%;
  height: 71vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const Count = styled.p`
  display: flex;
  justify-content: flex-end;
  margin: 0 2rem 1rem 2rem;
`;
const ListArea = styled.div`
  overflow: scroll;
  overflow-x: hidden;

::-webkit-scrollbar {
  background-color: transparent;
  width: 10px;
}

::-webkit-scrollbar-thumb{
  background-color: ${palette.gray};
  border-radius: 3px;
}
`;
const ListContainer = styled.ul`
`;
