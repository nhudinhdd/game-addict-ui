import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosClient } from "api-client/axios-client";
import THSort from "components/table/headerTableSort";
import { PlayerTeamRes } from "models/apiWapper/playerTeam";
import Image from "next/image";
import { Dropdown, Table } from "react-bootstrap";
import useSWR from "swr";

type Props = {
  playerID?: string;
  teamID?: string;
  handlerForms: () => void;
  updateID: (playerTeamID: string, playerID: string, teamID: string) => void;
};

export default function PlayerTeamList(props: Props) {
  const { playerID, teamID, handlerForms, updateID } = props;
  const fetcher = async (url: string) => {
    return await axiosClient
      .get(url)
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 200) throw error;
      });
  };
  const getNationUrl = `/player-team?player-id=${playerID}&team-id=${teamID}`;
  const { data } = useSWR<[PlayerTeamRes]>(getNationUrl, fetcher);

  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th>
            <THSort name="ID">#</THSort>
          </th>
          <th>Player First Name</th>
          <th>Player Last Name</th>
          <th>Team</th>
          <th>Start Year</th>
          <th>End Year</th>
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {data?.map((i) => (
          <tr key={i.playerTeamID}>
            <td>{i.playerTeamID}</td>
            <td>{i.playerInfoRes.firstName}</td>
            <td>{i.playerInfoRes.lastName}</td>
            <td>{i.teamRes.teamName}</td>
            <td>{i.startYear}</td>
            <td>{i.endYear}</td>
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${i.playerTeamID}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Info</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handlerForms();
                      updateID(
                        i.playerTeamID,
                        i.playerInfoRes.playerID,
                        i.teamRes.teamID
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
