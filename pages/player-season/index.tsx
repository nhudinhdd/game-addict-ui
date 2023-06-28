import React from "react";
import { NextPageWithLayout, Resource } from "models/comon";
import MainLayout from "layout/main";
import About from "pages/about";
import PlayerList from "components/player/playerList";

const PlayerPage: NextPageWithLayout = () => {
  return (
    <>
      <PlayerList
        page={1}
        playerName={"ronaldo"}
        seasonID={""}
        teamID={""}
        traitID={""}
      />
      <About></About>
    </>
  );
};

PlayerPage.Layout = MainLayout;
export default PlayerPage;
