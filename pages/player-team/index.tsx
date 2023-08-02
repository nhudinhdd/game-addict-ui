import { PaginationList } from "components/pagination/pagination";
import { PlayerTeamForm } from "components/player-team/playerTeamForm";
import PlayerTeamList from "components/player-team/playerTeamList";
import { PlayerInfoSelect } from "components/playerInfo/playerInfoSelect";
import { HeaderBar } from "components/table/headerBar";
import { TeamSelect } from "components/team/teamSelect";
import { TournamentSelect } from "components/tournament/tournamentSelect";
import MainLayout from "layout/main";
import { NextPageWithLayout } from "models/comon";
import { useState } from "react";

const PlayerTeam: NextPageWithLayout = () => {
  const [isShow, setIsShow] = useState(false);
  const [idDetail, setIdDetail] = useState("");
  const [playerIdDefault, setPlayerIdDefault] = useState("");
  const [teamIdDefault, setTeamIdDefault] = useState("");
  const [playerID, setPlayerID] = useState("");
  const [teamID, setTeamID] = useState("");
  const [tourID, setTourID] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const updateID = (playerTeamID: string, playerID: string, teamID: string) => {
    setIdDetail(playerTeamID);
    setPlayerIdDefault(playerID);
    setTeamIdDefault(teamID);
  };
  const handlerForms = () => {
    setIsShow(!isShow);
  };

  const addModal = () => {
    setIsShow(!isShow);
    setIdDetail("");
  };
  return (
    <>
      <HeaderBar nameAddButton="Add Player Team" addModal={addModal} />
      <div className="flex justify-start gap-3">
        <PlayerInfoSelect setPlayerID={setPlayerID}></PlayerInfoSelect>
        <TournamentSelect setTournamentID={setTourID}></TournamentSelect>
        <TeamSelect setTeamID={setTeamID} tourID={tourID}></TeamSelect>
      </div>

      {isShow && (
        <PlayerTeamForm
          handlerForms={handlerForms}
          playerTeamID={idDetail}
          playerIdDefault={playerIdDefault}
          teamIdDefault={teamIdDefault}
        ></PlayerTeamForm>
      )}
      <PlayerTeamList
        handlerForms={handlerForms}
        playerID={playerID}
        teamID={teamID}
        updateID={updateID}
        setTotalPage={setTotalPage}
        page={currentPage}
      />

      <PaginationList
        currentPage={currentPage}
        totalPage={totalPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

PlayerTeam.Layout = MainLayout;
export default PlayerTeam;
