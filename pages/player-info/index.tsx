import React, { useState } from "react";
import { NextPageWithLayout } from "models/comon";
import MainLayout from "layout/main";
import NationList from "components/nation/nationList";
import { HeaderBar } from "components/table/headerBar";
import { ContinentSelect } from "components/continent/continentSelect";
import { NationForm } from "components/nation/nationForm";
import PlayerInfoList from "components/playerInfo/playerInfoList";
import { PlayerInfoForm } from "components/playerInfo/playeInfoForm";

const PlayerInfo: NextPageWithLayout = () => {
  const [isShowContinent, setIsShowContinent] = useState(false);
  const [playerInfoID, setPlayerInfoID] = useState("");
  const [nationID, setNationID] = useState("");
  const handlerForms = () => {
    setIsShowContinent(!isShowContinent);
  };

  const addModal = () => {
    setIsShowContinent(!isShowContinent);
    setPlayerInfoID("");
  };
  return (
    <>
      <HeaderBar nameAddButton="Add Player Info" addModal={addModal} />
      <ContinentSelect setContinentID={setNationID} />
      {isShowContinent && (
        <PlayerInfoForm
          handlerForms={handlerForms}
          playerInfoID={playerInfoID}
        ></PlayerInfoForm>
      )}
      <PlayerInfoList
        handlerForms={handlerForms}
        setPlayerInfoID={setPlayerInfoID}
        nationID={nationID}
      />
    </>
  );
};

PlayerInfo.Layout = MainLayout;
export default PlayerInfo;
