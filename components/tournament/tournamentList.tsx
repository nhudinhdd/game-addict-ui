import { Dropdown, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import THSort from "components/table/headerTableSort";
import useTournament from "libs/hooks/useTournament";

type Props = {
  tourName: string;
  handlerForms: () => void;
  setTournamentID: (id: string) => void;
};

export default function TournamentList(props: Props) {
  const { tourName, handlerForms, setTournamentID } = props;
  const handlerCallBack = (id: string) => {
    handlerForms();
    setTournamentID(id);
  };
  const { data } = useTournament();

  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th>
            <THSort name="ID">#</THSort>
          </th>
          <th>Tournament Name</th>
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {data?.map((tour) => (
          <tr key={tour.tourID}>
            <td>{tour.tourID}</td>
            <td>{tour.tourName}</td>
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${tour.tourID}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Info</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handlerCallBack(tour.tourID);
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
