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
      queryClient.invalidateQueries({ queryKey: ["todos"] });
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
      disabled={!appear}
    >
      {appear && "DELETE"}
    </DeleteBox>
  );
};
export default DeleteTodo;
const DeleteBox = styled.button<{ appear: string }>`
  width: ${props => props.appear === "true" ? '5.5rem' : '0'};
  color: #fff;
  background-color: ${props=>props.appear==='true'?palette.red:'transparent'};
  padding: ${props=>props.appear==='true'?'1rem':'0'};
  border-radius: 2.5rem;
  font-size: 0.7rem;
  box-shadow: ${props=>props.appear==='true'?"0px 4px 4px 0px rgba(0, 0, 0, 0.25)":'0'};
  text-align: center;
  :hover,
  :active {
    background-color: ${palette.dark_red};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  }
`;
