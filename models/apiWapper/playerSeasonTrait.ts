import { PlayerSeasonRes } from "./player";
import { TraitResponse } from "./trait";

export interface PlayerSeasonTraitRes {
  psTraitID?: string;
  trait?: TraitResponse;
  playerSeason?: PlayerSeasonRes;
}
