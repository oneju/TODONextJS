import { Session } from "next-auth";

export interface todo {
  id: number;
  content: string;
  checked: boolean;
  publisher: Session;
  publisherId: number;
}
