import { useMutation, useQueryClient } from "@tanstack/react-query";
import palette from "@/styles/palette";
import styled from "@emotion/styled";
import axios from "axios";

interface Props {
  id: number;
  deleteBox: (appear: boolean) => void;
  appear: boolean;
}

const DeleteTodo = ({ id, deleteBox, appear }: Props) => {
  const deleteTodo = async () => {
    await axios.post("/api/todo", {
      data: {
        function: "delete",
        id: id,
      },
    });
    deleteBox(false);
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteTodo"] });
    },
  });
  return (
    <DeleteBox
      onClick={() => {
        mutation.mutate();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        deleteBox(false);
      }}
      appear={appear ? "true" : "false"}
    ></DeleteBox>
  );
};
export default DeleteTodo;
const DeleteBox = styled.div<{ appear: string }>`
  transition: all 0.5s ease-out;
  background-color: ${palette.red};
  width: ${(props) => (props.appear === "true" ? "100%" : "0")};
  text-align: center;
  padding: 1rem 0;
  height: 100%;
`;
