"use client";
import styled from "@emotion/styled";
import palette from "@/styles/palette";
import axios from "axios";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteTodo from "./DeleteTodo";

const TodoComponent = ({
  id,
  content,
  checked,
}: {
  id: number;
  content: string;
  checked: string;
}) => {
  const [newContent, setNewContent] = useState(content);
  const [isChecked, setIsChecked] = useState(checked);
  const [doDelete, setDoDelete] = useState(false);
  const contentRef = useRef<HTMLInputElement>(null);

  const updateTodo = async () => {
    await axios.post("/api/todo", {
      headers: { "Content-Type": "application/json" },
      data: {
        function: "update",
        todo: {
          id: id,
          content: newContent,
          checked: isChecked,
        },
      },
    });
  };
  const checkTodo = () => {
    setIsChecked(isChecked === "true" ? "false" : "true");
    updateTodo();
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return (
    <Container
      onClick={() => contentRef.current?.focus()}
      onContextMenu={(e) => {
        e.preventDefault();
        setDoDelete(!doDelete);
      }}
    >
      <Content
        type="text"
        ref={contentRef}
        onChange={(e) => setNewContent(e.target.value)}
        onBlur={() => mutation.mutate()}
        readOnly={isChecked === "true" ? true : false}
        ischecked={isChecked}
        value={newContent}
      />
      {doDelete ? (
        <DeleteTodo id={id} deleteBox={setDoDelete} appear={doDelete} />
      ) : (
        <CheckButton onClick={checkTodo} ischecked={isChecked}>
          {isChecked === "true" ? "done" : "todo"}
        </CheckButton>
      )}
    </Container>
  );
};
export default TodoComponent;

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 52px;
`;

const Content = styled.input<{ ischecked: string }>`
  color: ${(props) =>
    props.ischecked === "true" ? palette.gray : palette.black};
  text-decoration: ${(props) =>
    props.ischecked === "true" ? "line-through" : "none"};
  font-size: 16px;
  /* width: 80vw; */
`;
const CheckButton = styled.button<{ ischecked: string }>`
  color: ${(props) =>
    props.ischecked === "true" ? palette.black : palette.gray};
  outline: none;
  text-align: center;
  width: 5.5rem;
  padding: 1rem;
  font-size: 1rem;
`;
