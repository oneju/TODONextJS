"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import styled from "@emotion/styled";

const NewTodo = () => {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const postTodo = async () => {
    await axios
      .post("/api/todo", {
        headers: { "Content-Type": "application/json" },
        data: {
          function: "create",
          content: newTodo,
        },
      })
      .then((res) => console.log(res));
    setNewTodo("");
  };

  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["addTodo"] });
    },
  });
  return (
    <AddTodo>
      <TodoContent
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
        placeholder="new todo content"
      />
      <SubmitButton
        onClick={() => {
          mutation.mutate();
        }}
      >
        Add Todo
      </SubmitButton>
    </AddTodo>
  );
};

export default NewTodo;
const AddTodo = styled.form`
  display: flex;

  background-color: #d9d9d9;
  width: 70vw;
  bottom: 0px;
  position: absolute;
  padding: 2rem 3rem 2rem 3rem;
  border-radius: 4rem 4rem 0 0;
  margin-top: 1rem;

  align-items: center;
  @media (max-width: 1120px) {
    width: 90vw;
  }
`;
const TodoContent = styled.input`
  display: flex;

  font-weight: bold;
  background-color: transparent;
  color: #fff;
  /* position: relative; */
  width: 80vw;

  font-size: 2rem;

  padding: 1rem;
  border-bottom: 4px solid #fff;
  align-items: center;
  ::placeholder {
    color: #eee;
  }
`;
const SubmitButton = styled.button`
  display: flex;
  padding: 1rem;
  font-size: large;
  border-radius: 50%;
  color: white;
  background-color: transparent;
`;
