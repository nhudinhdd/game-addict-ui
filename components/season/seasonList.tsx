import { Dropdown, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import THSort from "components/table/headerTableSort";
import Image from "next/image";
import useSeason from "libs/hooks/useSeason";

type Props = {
  seasonName: string;
  handlerForms: () => void;
  setSeasonID: (id: string) => void;
};

export default function SeasonList(props: Props) {
  const { seasonName, handlerForms, setSeasonID } = props;
  const handlerCallBack = (id: string) => {
    handlerForms();
    setSeasonID(id);
  };
  const { data } = useSeason();

  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th>
            <THSort name="ID">#</THSort>
          </th>
          <th>Season Short Name</th>
          <th>Season Full Name</th>
          <th>Season Logo</th>
          <th>Season Logo Description</th>
          <th>Season Logo Title</th>
          <th>Season Logo caption</th>
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {data?.map((season) => (
          <tr key={season.seasonID}>
            <td>{season.seasonID}</td>
            <td>{season.shortName}</td>
            <td>{season.fullName}</td>

            <td>
              <div
                className="position-relative mx-auto"
                style={{ width: "70px", height: "70px" }}
              >
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  alt={season.altLogoSeason}
                  sizes="5vw"
                  src={season.logo}
                />
              </div>
            </td>
            <td>{season.altLogoSeason}</td>
            <td>{season.titleLogoSeason}</td>
            <td>{season.captionLogoSeason}</td>
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${season.seasonID}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Info</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handlerCallBack(season.seasonID);
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
