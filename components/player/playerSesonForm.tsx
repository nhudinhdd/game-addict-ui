import { axiosAuth } from "api-client/axios-client";
import { PlayerInfoSelect } from "components/playerInfo/playerInfoSelect";
import { SeasonSelect } from "components/season/seasonSelect";
import { TraitSelect } from "components/trait/traitSelect";
import usePlayerSeason from "libs/hooks/usePlayerSeaason";
import { useEffect, useState } from "react";

interface PlayerSeasonFormProps {
  playerSeasonID?: string;
  handlerForms?: () => void;
}
export function PlayerSeasonForm(props: PlayerSeasonFormProps) {
  const { playerSeasonID, handlerForms } = props;
  const [seasonID, setSeasonID] = useState("");
  const [playerID, setPlayerID] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [traitIDs, setMultipleValue] = useState(new Set([]));
  const setValue = (value: string) => {
    let values = new Set();
    let selects: NodeListOf<HTMLElement> =
      document.getElementsByName("TraitSelectInput");
    for (let i = 0; i < selects.length; i++) {
      var node = selects.item(i);
      values.add((node as HTMLInputElement).value);
    }

    console.log(values);

    setMultipleValue(values);
  };
  const { data, isLoading } = usePlayerSeason({
    playerSeasonID: playerSeasonID,
  });
  useEffect(() => {
    setSeasonID(data?.season.seasonID);
    setPlayerID(data?.playerInfo.playerID);
  }, [isLoading]);
  const handlerFile = (e) => {
    setFileUpload(e.target.files[0]);
  };
  const getFormData = (e) => {
    const values = e.target;
    const formData = new FormData();

    formData.append("playerID", playerID);
    formData.append("seasonID", seasonID);
    formData.append("traitIDs", JSON.stringify(Array.from(traitIDs.values())));
    formData.append("playerPosition", values.playerPosition.value);
    formData.append("playerSubPosition", values.playerSubPosition.value);
    formData.append("player-season-avatar", fileUpload);
    formData.append("altAvatar", values.altAvatar.value);
    formData.append("titleAvatar", values.titleAvatar.value);
    formData.append("captionAvatar", values.captionAvatar.value);
    formData.append("reputation", values.reputation.value);
    formData.append("workRateDef", values.workRateDef.value);
    formData.append("workRateAtt", values.workRateAtt.value);
    formData.append("salary", values.salary.value);
    formData.append("height", values.height.value);
    formData.append("weight", values.weight.value);
    formData.append("fitness", values.fitness.value);
    formData.append("leftFoot", values.leftFoot.value);
    formData.append("rightFoot", values.rightFoot.value);
    formData.append("skill", values.skill.value);
    formData.append("speedUp", values.speedUp.value);
    formData.append("speedSprint", values.speedSprint.value);
    formData.append("dribbling", values.dribbling.value);
    formData.append("ballControl", values.ballControl.value);
    formData.append("shortPassing", values.shortPassing.value);
    formData.append("finishing", values.finishing.value);
    formData.append("shotPower", values.shotPower.value);
    formData.append("heading", values.heading.value);
    formData.append("longShot", values.longShot.value);
    formData.append("positioning", values.positioning.value);
    formData.append("vision", values.vision.value);
    formData.append("reactions", values.reactions.value);
    formData.append("volleys", values.volleys.value);
    formData.append("penalties", values.penalties.value);
    formData.append("crossing", values.crossing.value);
    formData.append("longPassing", values.longPassing.value);
    formData.append("freeKick", values.freeKick.value);
    formData.append("curve", values.curve.value);
    formData.append("agility", values.agility.value);
    formData.append("balance", values.balance.value);
    formData.append("marking", values.marking.value);
    formData.append("tackleStand", values.tackleStand.value);
    formData.append("intercep", values.intercep.value);
    formData.append("tackleSliding", values.tackleSliding.value);
    formData.append("strength", values.strength.value);
    formData.append("stamina", values.stamina.value);
    formData.append("aggression", values.aggression.value);
    formData.append("jumping", values.jumping.value);
    formData.append("composure", values.composure.value);
    formData.append("gkDiv", values.gkDiv.value);
    formData.append("gkHanding", values.gkHanding.value);
    formData.append("gkKicking", values.gkKicking.value);
    formData.append("gkReactions", values.gkReactions.value);
    formData.append("gkPositioning", values.gkPositioning.value);
    formData.append("pac", values.pac.value);
    formData.append("sho", values.aggression.value);
    formData.append("pas", values.pas.value);
    formData.append("dri", values.dri.value);
    formData.append("def", values.def.value);
    formData.append("phy", values.phy.value);
    formData.append("ovr", values.ovr.value);
    return formData;
  };

  const insert = async (e) => {
    const formData = getFormData(e);
    const res = await axiosAuth
      .post(`/management/player-season`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data);
    return res;
  };

  const update = async (playerSeasonID: string, e) => {
    const formData = getFormData(e);
    const res = await axiosAuth
      .put(`/management/player-season/${playerSeasonID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data.data);
    return res;
  };
  const handlerSubmit = (e) => {
    const values = e.target;
    const res = data ? update(values.playerSeasonID.value, e) : insert(e);
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
          className="relative w-full max-w-2xl m-auto max-h-full overflow-auto"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="relative  rounded-lg shadow bg-slate-50">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900">
                Player Season Form
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
                      <label className="font-bold">Player Season ID *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        defaultValue={data?.playerSeasonID}
                        disabled
                        name="playerSeasonID"
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4">
                    <PlayerInfoSelect
                      setPlayerID={setPlayerID}
                      playerIdDefault={data?.playerInfo?.playerID}
                    ></PlayerInfoSelect>
                  </div>
                  <div className="mt-4">
                    <SeasonSelect
                      setSeasonID={setSeasonID}
                      defaultID={data?.season?.seasonID}
                    ></SeasonSelect>
                  </div>

                  <div className="mt-4">
                    <TraitSelect
                      isMultipleSelect={true}
                      setValue={setValue}
                      traitDefault={data?.playerSeasonTrait?.map((pst) => {
                        return pst.trait.traitID;
                      })}
                    ></TraitSelect>
                  </div>

                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Player Position *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="playerPosition"
                        defaultValue={data?.playerPosition}
                      ></input>
                    </div>
                  </div>

                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Player Sub Position *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="playerSubPosition"
                        defaultValue={data?.playerSubPosition}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Avatar *</label>
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
                            name="altAvatar"
                            defaultValue={data?.altAvatar}
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
                            name="titleAvatar"
                            defaultValue={data?.titleAvatar}
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
                            name="captionAvatar"
                            defaultValue={data?.captionAvatar}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Reputation *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="reputation"
                        defaultValue={data?.reputation}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Work Rate Def *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="workRateDef"
                        defaultValue={data?.workRateDef}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Work Rate Att *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="workRateAtt"
                        defaultValue={data?.workRateAtt}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Salary *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="salary"
                        defaultValue={data?.salary}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Height *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="height"
                        defaultValue={data?.height}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Weight *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="weight"
                        defaultValue={data?.weight}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Fitness *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="fitness"
                        defaultValue={data?.fitness}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Left foot *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="leftFoot"
                        defaultValue={data?.leftFoot}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Right Foot *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="rightFoot"
                        defaultValue={data?.rightFoot}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Skill *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="skill"
                        defaultValue={data?.skill}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Speed Up *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="speedUp"
                        defaultValue={data?.speedUp}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Speed Sprint *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="speedSprint"
                        defaultValue={data?.speedSprint}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Dribbling *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="dribbling"
                        defaultValue={data?.dribbling}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Ball Control *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="ballControl"
                        defaultValue={data?.ballControl}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Short Passing *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="shortPassing"
                        defaultValue={data?.shortPassing}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Finishing *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="finishing"
                        defaultValue={data?.finishing}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Shot Power *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="shotPower"
                        defaultValue={data?.shotPower}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Heading *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="heading"
                        defaultValue={data?.heading}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Long Shot *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="longShot"
                        defaultValue={data?.longShot}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Positioning *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="positioning"
                        defaultValue={data?.positioning}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Vision *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="vision"
                        defaultValue={data?.vision}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Reactions *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="reactions"
                        defaultValue={data?.reactions}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">volleys *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="volleys"
                        defaultValue={data?.volleys}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Penalties *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="penalties"
                        defaultValue={data?.penalties}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Crossing *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="crossing"
                        defaultValue={data?.crossing}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Long Passing *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="longPassing"
                        defaultValue={data?.longPassing}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Free Kick *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="freeKick"
                        defaultValue={data?.freeKick}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Curve *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="curve"
                        defaultValue={data?.curve}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Agility *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="agility"
                        defaultValue={data?.agility}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Balance *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="balance"
                        defaultValue={data?.balance}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Marking *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="marking"
                        defaultValue={data?.marking}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Tackle Stand *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="tackleStand"
                        defaultValue={data?.tackleStand}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Intercep *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="intercep"
                        defaultValue={data?.intercep}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Tackle Sliding *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="tackleSliding"
                        defaultValue={data?.tackleSliding}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Strength *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="strength"
                        defaultValue={data?.strength}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Stamina *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="stamina"
                        defaultValue={data?.stamina}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Aggression *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="aggression"
                        defaultValue={data?.aggression}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Jumping *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="jumping"
                        defaultValue={data?.jumping}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Composure *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="composure"
                        defaultValue={data?.composure}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Gk Div *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="gkDiv"
                        defaultValue={data?.gkDiv}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Gk Handing *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="gkHanding"
                        defaultValue={data?.gkHanding}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Gk Kicking *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="gkKicking"
                        defaultValue={data?.gkKicking}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Gk Reactions *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="gkReactions"
                        defaultValue={data?.gkReactions}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">Gk Positioning *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="gkPositioning"
                        defaultValue={data?.gkPositioning}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">PAC *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="pac"
                        defaultValue={data?.pac}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">SHO *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="sho"
                        defaultValue={data?.sho}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">PAS *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="pas"
                        defaultValue={data?.pas}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">DRI *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="dri"
                        defaultValue={data?.dri}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">DEF *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="def"
                        defaultValue={data?.def}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">PHY *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="phy"
                        defaultValue={data?.phy}
                      ></input>
                    </div>
                  </div>
                  <div className="mt-4 flex-col">
                    <div>
                      <label className="font-bold">OVR *</label>
                    </div>
                    <div>
                      <input
                        className="border-slate-400 w-full border-solid border-b-2"
                        name="ovr"
                        defaultValue={data?.ovr}
                      ></input>
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
