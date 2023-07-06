import { HeaderBar } from "components/table/headerBar";
import { TeamForm } from "components/team/teamForm";
import TeamList from "components/team/teamList";
import { TournamentSelect } from "components/tournament/tournamentSelect";
import MainLayout from "layout/main";
import { NextPageWithLayout } from "models/comon";
import { useState } from "react";

const Team: NextPageWithLayout = () => {
  const [isShow, setIsShow] = useState(false);
  const [teamID, setTeamID] = useState("");
  const [tournamentID, setTournamentID] = useState("");
  const handlerForms = () => {
    setIsShow(!isShow);
  };

  const addModal = () => {
    setIsShow(!isShow);
    setTeamID("");
  };
  return (
    <>
      <HeaderBar nameAddButton="Add Team" addModal={addModal} />
      <TournamentSelect setTournamentID={setTournamentID} />
      {isShow && (
        <TeamForm handlerForms={handlerForms} teamID={teamID}></TeamForm>
      )}
      <TeamList
        handlerForms={handlerForms}
        tourID={tournamentID}
        setTeamID={setTeamID}
      />
    </>
  );
};

Team.Layout = MainLayout;
export default Team;
