import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import { DoctorDetails3 } from "../../SVG/index";
import { GiMedicines } from "../../ReactICON/index";
import { CiCircleCheck } from "react-icons/ci";

import { GET_PATIENT_DETAILS } from "../../../Context/constants";
import { useStateContext } from "../../../Context/index";

const AppoinmentList = ({
  item,
  index,
  setPrescribeMedicine,
  prescribeDoctor,
  setPrescribeDoctor,
  setUpdateCondition,
  conditionUpdate,
  setConditionUpdate,
}) => {
  const { COMPLETE_APPOINTMENT } = useStateContext();
  const [patient, setPatient] = useState();

  useEffect(() => {
    if (item) {
      const fetchData = async () => {
        GET_PATIENT_DETAILS(item?.patientId).then((patient) => {
          setPatient(patient);
        });
      };
      fetchData();
    }
  }, [item]);

  return (
    <li key={index}>
      <div className="timeline-panel bgl-dark flex-wrap border-0 p-3 rounded">
        <div className="media bg-transparent me-2">
          <img
            className="rounded-circle"
            alt="image"
            width={48}
            src={patient?.image}
          />
        </div>
        <div className="media-body">
          <h5 className="mb-1 fs-18">
            {patient?.firstName} {patient?.lastName}
          </h5>
          <span>Phone: {patient?.mobile}</span>
          <br />
          <span>Email: {patient?.emailID}</span>
        </div>
        <ul className="mt-3 d-flex flex-wrap text-primary font-w600">
          <li className="me-2 fs-15">Time: {item?.date}</li>
        </ul>
        <div className="mt-3 d-flex flex-wrap text-primary font-w600">
          <a
            onClick={() => COMPLETE_APPOINTMENT(item?.appoinmnetID)}
            className="btn btn-primary light btn-rounded mb-2 me-2"
          >
            <CiCircleCheck className="fs-32 me-2" />
            Complete Appoint
          </a>
        </div>
      </div>
    </li>
  );
};

export default AppoinmentList;
