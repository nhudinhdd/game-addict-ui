import PlayerList from "components/player/playerList";
import MainLayout from "layout/main";
import { NextPageWithLayout } from "models/comon";

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
    </>
  );
};

PlayerPage.Layout = MainLayout;
export default PlayerPage;
