import { NationRes } from "models/nation/nation";

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

export interface SeasonRes {
  seasonID?: string;
  shortName?: string;
  fullName?: string;
  logo?: string;
  altLogoSeason?: string;
  titleLogoSeason?: string;
  captionLogoSeason?: string;
}

export interface PlayerInfoRes {
  playerID?: string;
  nationRes?: NationRes;
  firstName?: string;
  lastName?: string;
  birthDay?: string;
}
