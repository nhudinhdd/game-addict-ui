import { Dropdown, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import { axiosClient } from "../../api-client/axios-client";
import { PlayerInfoRes } from "../../models/apiWapper/playerInfo";
import THSort from "../../components/table/headerTableSort";
import { MetaDataList } from "models/apiWapper/common";

type Props = {
  nationID?: string;
  handlerForms: () => void;
  setPlayerInfoID: (id: string) => void;
  setTotalPage: (totalPage: number) => void;
  page?: number;
};

export default function PlayerInfoList(props: Props) {
  const {
    nationID = "",
    handlerForms,
    setPlayerInfoID,
    setTotalPage,
    page,
  } = props;
  const fetcher = async (url: string, contientName: string) => {
    return await axiosClient
      .get(url)
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 200) throw error;
      });
  };
  const { data } = useSWR<MetaDataList<PlayerInfoRes>>(
    `/player-info?nation-id=${nationID}&page=${page - 1}`,
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
            <THSort name="ID">#</THSort>
          </th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Birthday</th>
          <th>Ensgin Logo</th>
          <th>Ensgin Name</th>
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {data?.data?.map((playerInfo) => (
          <tr key={playerInfo.playerID}>
            <td>{playerInfo.playerID}</td>
            <td>{playerInfo.firstName}</td>
            <td>{playerInfo.lastName}</td>
            <td>{playerInfo.birthDay}</td>
            <td>
              <div
                className="position-relative mx-auto"
                style={{ width: "70px", height: "70px" }}
              >
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  alt={playerInfo.nationRes.altEnsign}
                  sizes="5vw"
                  src={playerInfo.nationRes.ensign}
                />
              </div>
            </td>
            <td>{playerInfo.nationRes?.nationName}</td>
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${playerInfo.playerID}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Info</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handlerForms();
                      setPlayerInfoID(playerInfo.playerID);
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
