import { PlayerInfoRes } from "./playerInfo";
import { TeamRes } from "./team";

export interface PlayerTeamRes {
  playerTeamID: string;
  playerInfoRes?: PlayerInfoRes;
  teamRes?: TeamRes;
  startYear?: string;
  endYear?: string;
}
