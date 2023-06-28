import React, { useState } from "react";
import { NextPageWithLayout } from "models/comon";
import MainLayout from "layout/main";
import { ContinentForm } from "components/continent/continentForm";
import NationList from "components/nation/nationList";
import { HeaderBar } from "components/table/headerBar";
import { ContinentSelect } from "components/continent/continentSelect";
import { NationForm } from "components/nation/nationForm";

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
