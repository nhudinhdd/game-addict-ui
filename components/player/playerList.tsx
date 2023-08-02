import { Dropdown, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import Image from "next/image";
import THSort from "components/table/headerTableSort";
import useSWR from "swr";
import { axiosClient } from "api-client/axios-client";
import { PlayerSeasonRes } from "models/apiWapper/player";
import { MetaDataList } from "models/apiWapper/common";

type Props = {
  page: number;
  playerName: string;
  seasonID: string;
  playerID: string;
  handlerForms: () => void;
  setIDPlayerSeasonFomrm: (
    playerSeasonID: string,
    playerID: string,
    seasonID: string
  ) => void;
  setTotalPage: (totalPage: number) => void;
};

export default function PlayerList(props: Props) {
  const {
    page,
    playerName,
    seasonID,
    playerID,
    handlerForms,
    setIDPlayerSeasonFomrm,
    setTotalPage,
  } = props;
  console.log(page);

  const fetcher = async (url: string) => {
    return await axiosClient
      .get(url)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const { data, error, isLoading } = useSWR<MetaDataList<PlayerSeasonRes>>(
    `/player-season?page=${page - 1}&season-id=${seasonID}`,
    fetcher
  );

  useEffect(() => {
    setTotalPage(data ? data.totalPage : 0);
  }, [data]);

  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th>
            <THSort name="id">#</THSort>
          </th>
          <th aria-label="Photo">Avatar</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Player Position</th>
          <th>Season Logo</th>
          <th className="text-end">
            <THSort name="pac">Pac</THSort>
          </th>
          <th className="text-end">
            <THSort name="sho">Sho</THSort>
          </th>
          <th className="text-end">
            <THSort name="pas">Pas</THSort>
          </th>
          <th className="text-end">
            <THSort name="dri">Dri</THSort>
          </th>
          <th className="def">
            <THSort name="def">Def</THSort>
          </th>
          <th className="text-end">
            <THSort name="phy">Phy</THSort>
          </th>
          <th className="text-end">
            <THSort name="ovr">Ovr</THSort>
          </th>
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {data?.data?.map((player) => (
          <tr key={player.playerSeasonID}>
            <td>{player.playerSeasonID}</td>
            <td>
              <div
                className="position-relative mx-auto"
                style={{ width: "70px", height: "70px" }}
              >
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  alt={player.altAvatar}
                  sizes="5vw"
                  src={player.avatar}
                />
              </div>
            </td>
            <td>{player.playerInfoRes.firstName}</td>
            <td>{player.playerInfoRes.lastName}</td>
            <td>{player.playerPosition}</td>
            <td>
              <div
                className="position-relative mx-auto"
                style={{ width: "70px", height: "70px" }}
              >
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  alt={player.seasonRes.altLogoSeason}
                  sizes="5vw"
                  src={player.seasonRes.logo}
                />
              </div>
            </td>
            <td className="text-end">{player.pac}</td>
            <td className="text-end">{player.sho}</td>
            <td className="text-end">{player.pas}</td>
            <td className="text-end">{player.dri}</td>
            <td className="text-end">{player.def}</td>
            <td className="text-end">{player.phy}</td>
            <td className="text-end">{player.ovr}</td>
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${player.playerSeasonID}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handlerForms();
                      setIDPlayerSeasonFomrm(
                        player.playerSeasonID,
                        player.playerInfoRes.playerID,
                        player.seasonRes.seasonID
                      );
                    }}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item className="text-danger" href="#/action-3">
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
