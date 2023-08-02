import { PaginationList } from "components/pagination/pagination";
import PlayerList from "components/player/playerList";
import { PlayerSeasonForm } from "components/player/playerSesonForm";
import { PlayerInfoSelect } from "components/playerInfo/playerInfoSelect";
import { SeasonSelect } from "components/season/seasonSelect";
import { HeaderBar } from "components/table/headerBar";
import MainLayout from "layout/main";
import { NextPageWithLayout } from "models/comon";
import { useState } from "react";

const PlayerPage: NextPageWithLayout = () => {
  const [isShow, setIsShow] = useState(false);
  const [idDetail, setIdDetail] = useState("");
  const [playerID, setPlayerID] = useState("");
  const [seasonID, setSeasonID] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  function addModal() {
    setIsShow(!isShow);
    setIdDetail("");
  }
  const handlerForms = () => {
    setIsShow(!isShow);
  };
  const setIDPlayerSeasonFomrm = (
    playerSeasonID: string,
    playerID: string,
    seasonID: string
  ) => {
    setIdDetail(playerSeasonID);
    setPlayerID(playerID);
    setSeasonID(seasonID);
  };
  return (
    <>
      <HeaderBar nameAddButton="Add Player Season" addModal={addModal} />
      <div className="flex justify-start gap-3">
        <PlayerInfoSelect setPlayerID={setPlayerID}></PlayerInfoSelect>
        <SeasonSelect setSeasonID={setSeasonID}></SeasonSelect>
      </div>

      {isShow && (
        <PlayerSeasonForm
          handlerForms={handlerForms}
          playerSeasonID={idDetail}
        ></PlayerSeasonForm>
      )}
      <PlayerList
        page={currentPage}
        playerName={""}
        seasonID={seasonID}
        playerID={playerID}
        handlerForms={handlerForms}
        setIDPlayerSeasonFomrm={setIDPlayerSeasonFomrm}
        setTotalPage={setTotalPage}
      />

      <PaginationList
        currentPage={currentPage}
        totalPage={totalPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

PlayerPage.Layout = MainLayout;
export default PlayerPage;
