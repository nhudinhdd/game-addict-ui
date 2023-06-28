import { Dropdown, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Image from "next/image";
import THSort from "components/table/headerTableSort";
import useSWR from "swr";
import { axiosClient } from "api-client/axios-client";
import { ContinentRes } from "models/continent/continent";
import { ContinentForm } from "./continentForm";

type Props = {
  contientName: string;
  handlerContientForms: () => void;
  setIDContinent: (id: string) => void;
};

export default function ContinentList(props: Props) {
  const { contientName, handlerContientForms, setIDContinent } = props;
  const handlerCallBack = (id: string) => {
    handlerContientForms();
    setIDContinent(id);
  };
  const fetcher = async (url: string, contientName: string) => {
    return await axiosClient
      .get(url)
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 200) throw error;
      });
  };

  const { data } = useSWR<[ContinentRes]>(`/continent`, fetcher);

  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th>
            <THSort name="ID">#</THSort>
          </th>
          <th>Contient Name</th>
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {data?.map((continent) => (
          <tr key={continent.continentID}>
            <td>{continent.continentID}</td>
            <td>{continent.continentName}</td>
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${continent.continentID}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Info</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handlerCallBack(continent.continentID);
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
