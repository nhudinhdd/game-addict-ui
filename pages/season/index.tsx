import { SeasonForm } from "components/season/seasonForm";
import SeasonList from "components/season/seasonList";
import { HeaderBar } from "components/table/headerBar";
import MainLayout from "layout/main";
import { NextPageWithLayout } from "models/comon";
import { useState } from "react";

const Season: NextPageWithLayout = () => {
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
      <HeaderBar nameAddButton="Add Season" addModal={addModal} />
      {isShow && (
        <SeasonForm
          handlerForms={handlerForms}
          seasonID={idDetail}
        ></SeasonForm>
      )}
      <SeasonList
        seasonName={""}
        handlerForms={handlerForms}
        setSeasonID={setIdDetail}
      />
    </>
  );
};

Season.Layout = MainLayout;
export default Season;
