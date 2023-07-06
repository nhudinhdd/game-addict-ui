import { HeaderBar } from "components/table/headerBar";
import { TraitForm } from "components/trait/traitForm";
import TraitList from "components/trait/traitList";
import MainLayout from "layout/main";
import { NextPageWithLayout } from "models/comon";
import { useState } from "react";

const Trait: NextPageWithLayout = () => {
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
      <HeaderBar nameAddButton="Add Trait" addModal={addModal} />
      {isShow && (
        <TraitForm handlerForms={handlerForms} traitID={idDetail}></TraitForm>
      )}
      <TraitList
        traitName={""}
        handlerForms={handlerForms}
        setTraitID={setIdDetail}
      />
    </>
  );
};

Trait.Layout = MainLayout;
export default Trait;
