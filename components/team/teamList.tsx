import { Dropdown, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Image from "next/image";
import THSort from "components/table/headerTableSort";
import useTeam from "libs/hooks/useTeam";

type Props = {
  tourID?: string;
  handlerForms: () => void;
  setTeamID: (id: string) => void;
};

export default function TeamList(props: Props) {
  const { tourID, handlerForms, setTeamID } = props;

  const { data } = useTeam({ tourID: tourID });

  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th>
            <THSort name="ID">#</THSort>
          </th>
          <th>Team Name</th>
          <th>Tournament Name</th>
          <th>Team Logo</th>
          <th>Description Ensgin</th>
          <th>Title Ensgin</th>
          <th>Caption Ensgin</th>
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {data?.map((team) => (
          <tr key={team.teamID}>
            <td>{team.teamID}</td>
            <td>{team.teamName}</td>
            <td>{team.tournamentRes.tourName}</td>
            <td>
              <div
                className="position-relative mx-auto"
                style={{ width: "70px", height: "70px" }}
              >
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  alt={team.altLogo}
                  sizes="5vw"
                  src={team.teamLogo}
                />
              </div>
            </td>
            <td>{team.altLogo}</td>
            <td>{team.titleLogo}</td>
            <td>{team.captionLogo}</td>
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${team.teamID}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Info</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handlerForms();
                      setTeamID(team.teamID);
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
