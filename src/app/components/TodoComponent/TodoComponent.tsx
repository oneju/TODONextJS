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
    await axios
      .post("/api/todo", {
        headers: { "Content-Type": "application/json" },
        data: {
          function: "update",
          todo: {
            id: id,
            content: newContent,
            checked: isChecked,
          },
        },
      })
      .then((res) => console.log(res));
  };
  const checkTodo = () => {
    setIsChecked(isChecked === "true" ? "false" : "true");
    updateTodo();
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateTodo"] });
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
      <DeleteTodo id={id} deleteBox={setDoDelete} appear={doDelete} />
      <Content
        type="text"
        ref={contentRef}
        onChange={(e) => setNewContent(e.target.value)}
        onBlur={() => mutation.mutate()}
        readOnly={isChecked === "true" ? true : false}
        ischecked={isChecked}
        value={newContent}
      />
      <CheckButton onClick={checkTodo} ischecked={isChecked} />
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
  border-bottom: 1px solid ${palette.gray};
`;

const Content = styled.input<{ ischecked: string }>`
  color: ${(props) => (props.ischecked === "true" ? palette.gray : "black")};
  text-decoration: ${(props) =>
    props.ischecked === "true" ? "line-through" : "none"};
  margin-left: 12px;
  font-size: 16px;
  width: 80vw;
`;
const CheckButton = styled.button<{ ischecked: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${palette.red};
  background-color: ${(props) =>
    props.ischecked === "true" ? palette.deep_red : "transparent"};
  outline: none;
`;
