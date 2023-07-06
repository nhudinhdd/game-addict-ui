import { ContinentSelect } from "components/continent/continentSelect";
import { NationForm } from "components/nation/nationForm";
import NationList from "components/nation/nationList";
import { HeaderBar } from "components/table/headerBar";
import MainLayout from "layout/main";
import { NextPageWithLayout } from "models/comon";
import { useState } from "react";

const Nation: NextPageWithLayout = () => {
  const [isShowContinent, setIsShowContinent] = useState(false);
  const [nationID, setNationID] = useState("");
  const [idContinent, setIDContinent] = useState("");
  const handlerForms = () => {
    setIsShowContinent(!isShowContinent);
  };

  const addModal = () => {
    setIsShowContinent(!isShowContinent);
    setNationID("");
  };
  return (
    <>
      <HeaderBar nameAddButton="Add Nation" addModal={addModal} />
      <ContinentSelect setContinentID={setIDContinent} />
      {isShowContinent && (
        <NationForm
          handlerForms={handlerForms}
          nationID={nationID}
        ></NationForm>
      )}
      <NationList
        handlerForms={handlerForms}
        continentID={idContinent}
        setNationID={setNationID}
      />
    </>
  );
};

Nation.Layout = MainLayout;
export default Nation;
