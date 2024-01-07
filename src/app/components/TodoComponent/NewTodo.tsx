"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import styled from "@emotion/styled";
import { useSession } from "next-auth/react";
import palette from "@/styles/palette";

const NewTodo = () => {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const postTodo = async () => {
    await axios
      .post("/api/todo", {
        headers: { "Content-Type": "application/json" },
        data: {
          function: "create",
          content: newTodo,
          user: session?.user.id,
        },
      })
      .then((res) => console.log(res));
    setNewTodo("");
  };

  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return (
    <AddTodo>
      <TodoContent
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
        placeholder="new todo content"
        autoFocus={true}
      />
      <SubmitButton
        onClick={() => {
          mutation.mutate();
        }}
        disabled={newTodo === "" ? true : false}
      >
        add
      </SubmitButton>
    </AddTodo>
  );
};

export default NewTodo;
const AddTodo = styled.form`
  display: flex;

  background-color: #d9d9d9;
  width: 80%;
  bottom: 0px;
  position: absolute;
  padding: 2rem;
  border-radius: 4rem;
  margin: 1rem;

  background: #d9d9d9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  align-items: center;
  @media (max-width: 600px) {
    box-shadow: 0;
    margin: 0;
    width: 100vw;
    border-radius: 0;
  }
`;
const TodoContent = styled.input`
  display: flex;

  font-weight: bold;
  background-color: transparent;
  color: #fff;
  width: 100%;

  font-size: 2rem;

  padding: 1rem;
  align-items: center;
  ::placeholder {
    color: #eee;
  }
`;
const SubmitButton = styled.button`
  display: flex;
  padding: 1rem 1.5rem;
  font-size: 2rem;
  border-radius: 2.5rem;
  color: ${palette.dark_gray};
  background-color: ${palette.light_gray};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  :hover,
  :active {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;
