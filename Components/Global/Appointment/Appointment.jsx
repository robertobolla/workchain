import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import Header from "./Header";
import Table from "./Table";
import Booking from "./Booking";

import {
  GET_PATIENT_APPOINTMENT_HISTORYS,
  GET_DOCTOR_DETAILS,
  GET_ALL_REGISTERED_DOCTORS,
  GET_PATIENT_ID,
} from "../../../Context/constants";
import { useStateContext } from "../../../Context/index";

const Appointment = ({ setOpenComponent, setDoctorDetails }) => {
  const { CHECKI_IF_CONNECTED_LOAD, address, setAddress, SEND_MESSAGE } =
    useStateContext();

  const tableHead = [
    {
      name: "NAME",
    },
    {
      name: "PROFESSION",
    },
    {
      name: "EMAIL",
    },
    {
      name: "BOOKING DATE",
    },
    {
      name: "MOBILE",
    },
    {
      name: "WEB",
    },
    {
      name: "PROFILE",
    },
    {
      name: "STATUS",
    },
  ];

  const [patientAppoinment, setPatientAppoinment] = useState();
  const [registerDoctors, setRegisterDoctors] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const address = await CHECKI_IF_CONNECTED_LOAD();
        if (address) {
          const _patientID = await GET_PATIENT_ID();
          const appointments = await GET_PATIENT_APPOINTMENT_HISTORYS(
            _patientID
          );

          setPatientAppoinment(appointments);

          //DOCTORS
          GET_ALL_REGISTERED_DOCTORS().then((doctors) => {
            setRegisterDoctors(doctors);
          });
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [address]);

  return (
    <>
      <div className="container-fluid">
        <Header />
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <Table
                    thead={tableHead}
                    tableData={patientAppoinment}
                    name={"appoinment"}
                    setOpenComponent={setOpenComponent}
                    setDoctorDetails={setDoctorDetails}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Booking registerDoctors={registerDoctors} />
    </>
  );
};

export default Appointment;
