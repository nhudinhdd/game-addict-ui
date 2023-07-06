import { axiosAuth, axiosClient } from "api-client/axios-client";
import { ContinentSelect } from "components/continent/continentSelect";
import { NationSelect } from "components/nation/nationSelect";
import { PlayerInfoRes } from "models/apiWapper/playerInfo";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface PlayerInfoFormProps {
  playerInfoID?: string;
  handlerForms?: () => void;
}
export function PlayerInfoForm(props: PlayerInfoFormProps) {
  const { playerInfoID, handlerForms } = props;
  const [nationID, setNationID] = useState("");
  const [continentID, setContinentID] = useState("");
  const [birthday, setBirthday] = useState(new Date());

  const fetcher = async (url: string) => {
    return await axiosClient
      .get(url)
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 200) throw error;
      });
  };
  const { data, isLoading } = useSWR<PlayerInfoRes>(
    playerInfoID ? `/player-info/${playerInfoID}` : null,
    fetcher
  );

  useEffect(() => {
    setBirthday(data ? new Date(data.birthDay) : new Date());
  }, [isLoading]);
  const getFormData = (e) => {
    const values = e.target;
    const formData = new FormData();
    formData.append("nationID", nationID);
    formData.append("firstName", values.firstName.value);
    formData.append("lastName", values.lastName.value);
    formData.append("birthday", values.birthday.value);
    formData.append("playerStory", values.playerStory.value);
    return formData;
  };

  const insert = async (e) => {
    const formData = getFormData(e);
    const res = await axiosAuth
      .post(`/management/player-info`, formData)
      .then((res) => res.data.data);
    return res;
  };

  const update = async (playerInfoID: string, e) => {
    const formData = getFormData(e);
    const res = await axiosAuth
      .put(`/management/player-info/${playerInfoID}`, formData)
      .then((res) => res.data.data);
    return res;
  };
  const handlerSubmit = (e) => {
    const values = e.target;
    const res = data ? update(values.playerInfoID.value, e) : insert(e);
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
                Player Info Form
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
              <form name="playerInfoForm" onSubmit={handlerSubmit}>
                <div className="pl-10 mt-4 pr-10">
                  <div className="flex-col">
                    <div>
                      <label className="font-bold">Player Info ID *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        defaultValue={data?.playerID}
                        disabled
                        name="playerInfoID"
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4">
                    <ContinentSelect setContinentID={setContinentID} />
                  </div>
                  <div className="mt-4">
                    <NationSelect
                      continentID={continentID}
                      setNationID={setNationID}
                    />
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Frist Name*</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="firstName"
                        defaultValue={data?.firstName}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Last Name*</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="lastName"
                        defaultValue={data?.lastName}
                      ></input>
                    </div>
                  </div>

                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Birthday*</label>
                    </div>
                    <div>
                      <DatePicker
                        selected={birthday}
                        onChange={(date) => setBirthday(date)}
                        dateFormat="yyyy/MM/dd"
                        name="birthday"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Player story*</label>
                    </div>
                    <div>
                      <textarea
                        className="border-slate-400 w-full border-solid border-b-2 h-28"
                        name="playerStory"
                        defaultValue={data?.playerStory}
                      ></textarea>
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
