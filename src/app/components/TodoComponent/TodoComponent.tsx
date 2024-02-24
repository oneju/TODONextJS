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
      <CheckTodo>
        <DeleteTodo id={id} deleteBox={setDoDelete} appear={doDelete} />
        <CheckButton onClick={checkTodo} ischecked={isChecked} appear={doDelete}>
          {doDelete?'':isChecked === "true" ? "done" : "todo"}
        </CheckButton>
      </CheckTodo>
    </Container>
  );
};
export default TodoComponent;

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
`;

const Content = styled.input<{ ischecked: string }>`
  color: ${(props) =>
    props.ischecked === "true" ? palette.gray : palette.black};
  text-decoration: ${(props) =>
    props.ischecked === "true" ? "line-through" : "none"};
  margin-left:1rem;
  font-size: 1.5rem;
`;
const CheckTodo = styled.div`
  width: 6rem;
  height: 100%;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
`;
const CheckButton = styled.button<{ ischecked: string, appear:boolean }>`
  color: ${(props) =>
    props.ischecked === "true" ? palette.black : palette.gray};
  outline: none;
  text-align: center;
  width: ${props=>props.appear?'0':'5.5rem'};
  padding: ${props=>props.appear?'0':'1rem'};
  font-size: 1rem;
`;
