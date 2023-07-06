import { TournamentRes } from "./tournament";

export interface TeamRes {
  teamID?: string;
  tournamentRes?: TournamentRes;
  teamName?: string;
  teamLogo?: string;
  altLogo?: string;
  titleLogo?: string;
  captionLogo?: string;
}
