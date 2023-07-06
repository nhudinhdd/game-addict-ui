import { PlayerInfoRes } from "./playerInfo";
import { SeasonRes } from "./season";

export interface PlayerSeasonRes {
  playerSeasonID?: string;
  seasonRes?: SeasonRes;
  playerInfoRes?: PlayerInfoRes;
  playerPosition?: string;
  playerSubPosition?: string;
  avatar?: string;
  salary?: number;
  height?: number;
  weight?: number;
  fitness?: string;
  leftFoot?: string;
  rightFoot?: string;
  skill?: string;
  pac?: number;
  sho?: number;
  pas?: number;
  dri?: number;
  def?: number;
  phy?: number;
  altAvatar?: string;
  titleAvatar?: string;
  captionAvatar?: string;
}
