import { HeaderBar } from "components/table/headerBar";
import { TournamentForm } from "components/tournament/tournamentForm";
import TournamentList from "components/tournament/tournamentList";
import MainLayout from "layout/main";
import { NextPageWithLayout } from "models/comon";
import { useState } from "react";

const Tournament: NextPageWithLayout = () => {
  const [isShow, setIsShow] = useState(false);
  const [idDetail, setIdDetail] = useState("");
  const handlerForms = () => {
    setIsShow(!isShow);
  };

  const addModal = () => {
    setIsShow(!isShow);
    setIdDetail("");
  };
  return (
    <>
      <HeaderBar nameAddButton="Add Continent" addModal={addModal} />
      {isShow && (
        <TournamentForm
          handlerForms={handlerForms}
          tournamentID={idDetail}
        ></TournamentForm>
      )}
      <TournamentList
        tourName={""}
        handlerForms={handlerForms}
        setTournamentID={setIdDetail}
      />
    </>
  );
};

Tournament.Layout = MainLayout;
export default Tournament;
