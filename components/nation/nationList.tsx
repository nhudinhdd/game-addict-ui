import { Dropdown, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Image from "next/image";
import THSort from "components/table/headerTableSort";
import useSWR from "swr";
import { axiosClient } from "api-client/axios-client";
import { NationRes } from "models/apiWapper/nation";

type Props = {
  continentID?: string;
  handlerForms: () => void;
  setNationID: (id: string) => void;
};

export default function NationList(props: Props) {
  const { continentID, handlerForms, setNationID } = props;
  const fetcher = async (url: string, contientName: string) => {
    return await axiosClient
      .get(url)
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 200) throw error;
      });
  };
  const getNationUrl = continentID
    ? `/nation/list?continent-id=${continentID}`
    : "/nation/list";
  const { data } = useSWR<[NationRes]>(getNationUrl, fetcher);

  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th>
            <THSort name="ID">#</THSort>
          </th>
          <th>Nation Name</th>
          <th>Ensgin</th>
          <th>Description Ensgin</th>
          <th>Title Ensgin</th>
          <th>Caption Ensgin</th>
          <th>Continent Name</th>
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {data?.map((nation) => (
          <tr key={nation.nationID}>
            <td>{nation.nationID}</td>
            <td>{nation.nationName}</td>
            <td>
              <div
                className="position-relative mx-auto"
                style={{ width: "70px", height: "70px" }}
              >
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  alt={nation.altEnsign}
                  sizes="5vw"
                  src={nation.ensign}
                />
              </div>
            </td>
            <td>{nation.altEnsign}</td>
            <td>{nation.titleEnsign}</td>
            <td>{nation.captionEnsign}</td>
            <td>{nation.continentName}</td>
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${nation.nationID}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Info</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handlerForms();
                      setNationID(nation.nationID);
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
