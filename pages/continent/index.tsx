import { ContinentForm } from "components/continent/continentForm";
import ContinentList from "components/continent/continentList";
import { HeaderBar } from "components/table/headerBar";
import MainLayout from "layout/main";
import { NextPageWithLayout } from "models/comon";
import { useState } from "react";

const Continent: NextPageWithLayout = () => {
  const [isShowContinent, setIsShowContinent] = useState(false);
  const [idContinent, setIDContinent] = useState("");
  const handlerContientForms = () => {
    setIsShowContinent(!isShowContinent);
  };

  const addContinent = () => {
    setIsShowContinent(!isShowContinent);
    setIDContinent("");
  };
  return (
    <>
      <HeaderBar nameAddButton="Add Continent" addModal={addContinent} />
      {isShowContinent && (
        <ContinentForm
          handlerContientForms={handlerContientForms}
          continentID={idContinent}
        ></ContinentForm>
      )}
      <ContinentList
        contientName={""}
        handlerContientForms={handlerContientForms}
        setIDContinent={setIDContinent}
      />
    </>
  );
};

Continent.Layout = MainLayout;
export default Continent;
