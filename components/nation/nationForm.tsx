import { axiosAuth, axiosClient } from "api-client/axios-client";
import { ContinentSelect } from "components/continent/continentSelect";
import { NationRes } from "models/apiWapper/nation";
import { useState } from "react";
import useSWR from "swr";

interface NationFormProps {
  nationID?: string;
  handlerForms?: () => void;
}
export function NationForm(props: NationFormProps) {
  const { nationID, handlerForms } = props;
  const [continentID, setContinentID] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const fetcher = async (url: string) => {
    return await axiosClient
      .get(url)
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 200) throw error;
      });
  };
  const { data } = useSWR<NationRes>(
    nationID ? `/nation/detail/${nationID}` : null,
    fetcher
  );

  const handlerFile = (e) => {
    setFileUpload(e.target.files[0]);
  };
  const getFormData = (e) => {
    const values = e.target;
    const formData = new FormData();
    formData.append("nationID", values.nationID.value);
    formData.append("continentID", continentID);
    formData.append("nationName", values.nationName.value);
    formData.append("ensignLogo", fileUpload);
    formData.append("altEnsign", values.altEnsign.value);
    formData.append("titleEnsign", values.titleEnsign.value);
    formData.append("captionEnsign", values.captionEnsign.value);
    return formData;
  };

  const insert = async (e) => {
    const formData = getFormData(e);
    const res = await axiosAuth
      .post(`/management/nation`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data);
    return res;
  };

  const update = async (nationID: string, e) => {
    const formData = getFormData(e);
    const res = await axiosAuth
      .put(`/management/nation/${nationID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data);
    return res;
  };
  const handlerSubmit = (e) => {
    const values = e.target;
    const res = data ? update(values.nationID.value, e) : insert(e);
    return res;
  };
  return (
    <div>
      <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 bottom-0 z-1100 w-full max-h-full pl-64  flex flex-col flex-grow place-content-center bg-slate-700 bg-opacity-25"
        onClick={handlerForms}
      >
        <div
          className="relative w-full max-w-2xl m-auto max-h-full"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="relative  rounded-lg shadow bg-slate-50">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900">
                Nation Form
              </h3>
              <button
                type="button"
                className="text-gray-400  hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:text-slate-900"
                data-modal-hide="defaultModal"
                onClick={handlerForms}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <form name="nationForm" onSubmit={handlerSubmit}>
                <div className="pl-10 mt-4 pr-10">
                  <div className="flex-col">
                    <div>
                      <label className="font-bold">NationID *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        defaultValue={data?.nationID}
                        disabled
                        name="nationID"
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4">
                    <ContinentSelect
                      setContinentID={setContinentID}
                      continentID={data?.continentID}
                    />
                  </div>

                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Nation Name *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="nationName"
                        defaultValue={data?.nationName}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Ensign *</label>
                    </div>
                    <div className="pl-4">
                      <div>
                        <input
                          accept="*"
                          type="file"
                          name="attachedFile"
                          id="fileInput"
                          onChange={(e) => handlerFile(e)}
                        ></input>
                      </div>
                      <div>
                        <div className="mt-4 flex-col">
                          <label className="font-bold">Description</label>
                        </div>
                        <div>
                          <input
                            className="border-slate-400 w-full border-solid border-b-2"
                            name="altEnsign"
                            defaultValue={data?.altEnsign}
                          ></input>
                        </div>
                      </div>
                      <div>
                        <div className="mt-4 flex-col">
                          <label className="font-bold">Title</label>
                        </div>
                        <div>
                          <input
                            className="border-slate-400 w-full border-solid border-b-2"
                            name="titleEnsign"
                            defaultValue={data?.titleEnsign}
                          ></input>
                        </div>
                      </div>
                      <div>
                        <div className="mt-4 flex-col">
                          <label className="font-bold">Caption</label>
                        </div>
                        <div>
                          <input
                            className="border-slate-400 w-full border-solid border-b-2"
                            name="captionEnsign"
                            defaultValue={data?.captionEnsign}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    type="submit"
                    className="font-bold text-lg rounded-xl h-7 w-20 border-2 border-slate-700"
                  >
                    {data ? "Edit" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
