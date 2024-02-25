import { Session } from "next-auth";

export interface todo {
  id: number;
  content: string;
  checked: boolean;
  author: Session;
  authorId: string;
}
