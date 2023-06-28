import { Dropdown, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import Image from "next/image";
import THSort from "components/table/headerTableSort";
import useSWR from "swr";
import { axiosClient } from "api-client/axios-client";
import { PlayerSeasonRes } from "models/player/player";

type Props = {
  page: number;
  playerName: string;
  seasonID: string;
  traitID: string;
  teamID: string;
} & Pick<Parameters<typeof THSort>[0], "setSort" | "setOrder">;

export default function PlayerList(props: Props) {
  // const { players, setSort, setOrder } = props;
  const { page, playerName, seasonID, traitID, teamID, setOrder, setSort } =
    props;
  const fetcher = async (
    url: string,
    playerName: string,
    seasonID: string,
    teamID: string,
    traitID: string,
    page: number
  ) => {
    console.log("url = " + url);
    return await axiosClient
      .get(url[0], {
        params: {
          player_name: playerName,
          season_id: seasonID,
          team_id: teamID,
          trait_id: traitID,
          page: page,
        },
      })
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  };

  const { data, error, isLoading } = useSWR<[PlayerSeasonRes]>(
    [`/player-season`, playerName, seasonID, teamID, traitID, page],
    fetcher
  );
  console.log(data);

  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th>
            <THSort name="id" setSort={setSort} setOrder={setOrder}>
              #
            </THSort>
          </th>
          <th aria-label="Photo" />
          <th>First Name</th>
          <th>Last Name</th>
          <th>Player Position</th>
          <th>Season Logo</th>
          <th className="text-end">
            <THSort name="pac" setSort={setSort} setOrder={setOrder}>
              Pac
            </THSort>
          </th>
          <th className="text-end">
            <THSort name="sho" setSort={setSort} setOrder={setOrder}>
              Sho
            </THSort>
          </th>
          <th className="text-end">
            <THSort name="pas" setSort={setSort} setOrder={setOrder}>
              Pas
            </THSort>
          </th>
          <th className="text-end">
            <THSort name="dri" setSort={setSort} setOrder={setOrder}>
              Dri
            </THSort>
          </th>
          <th className="def">
            <THSort name="def" setSort={setSort} setOrder={setOrder}>
              Def
            </THSort>
          </th>
          <th className="text-end">
            <THSort name="phy" setSort={setSort} setOrder={setOrder}>
              Phy
            </THSort>
          </th>
          <th className="text-end">
            <THSort name="ovr" setSort={setSort} setOrder={setOrder}>
              Ovr
            </THSort>
          </th>
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {data?.map((player) => (
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
            <td className="text-end">100</td>
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
                  <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
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
