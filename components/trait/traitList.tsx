import { Dropdown, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import THSort from "components/table/headerTableSort";
import useTrait from "libs/hooks/useTrait";
import Image from "next/image";

type Props = {
  traitName: string;
  handlerForms: () => void;
  setTraitID: (id: string) => void;
};

export default function TraitList(props: Props) {
  const { traitName, handlerForms, setTraitID } = props;
  const handlerCallBack = (id: string) => {
    handlerForms();
    setTraitID(id);
  };
  const { data } = useTrait();

  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th>
            <THSort name="ID">#</THSort>
          </th>
          <th>Trait Name</th>
          <th>Trait Description</th>
          <th>Trait Logo</th>
          <th>Trait Logo Description</th>
          <th>Trait Logo Title</th>
          <th>Trait Logo caption</th>
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {data?.map((trait) => (
          <tr key={trait.traitID}>
            <td>{trait.traitID}</td>
            <td>{trait.name}</td>
            <td>{trait.description}</td>

            <td>
              <div
                className="position-relative mx-auto"
                style={{ width: "70px", height: "70px" }}
              >
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  alt={trait.altLogo}
                  sizes="5vw"
                  src={trait.logo}
                />
              </div>
            </td>
            <td>{trait.altLogo}</td>
            <td>{trait.titleLogo}</td>
            <td>{trait.captionLogo}</td>
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${trait.traitID}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Info</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handlerCallBack(trait.traitID);
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
