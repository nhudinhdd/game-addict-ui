import { NationRes } from "./nation";

export interface PlayerInfoRes {
  playerID: string;
  nationRes: NationRes;
  firstName: string;
  lastName: string;
  birthDay: string;
  playerStory: string;
}
