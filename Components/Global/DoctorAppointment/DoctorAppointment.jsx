import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import Header from "../Regular/Table/Header";
import Table from "./Table";

import {
  GET_DOCTOR_APPOINTMENTS_HISTORYS,
  GET_DOCTOR_DETAILS,
  GET_ALL_REGISTERED_DOCTORS,
  GET_DOCTOR_ID,
} from "../../../Context/constants";
import { useStateContext } from "../../../Context/index";

const DoctorAppointment = ({ setOpenComponent, setPatientDetails }) => {
  const { CHECKI_IF_CONNECTED_LOAD, address, setAddress, SEND_MESSAGE } =
    useStateContext();

  const tableHead = [
    {
      name: "PATIENT",
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
      name: "APPOINMENT",
    },
    {
      name: "PROFILE",
    },
    {
      name: "STATUS",
    },
  ];

  const [doctorAppoinments, setDoctorAppoinments] = useState();
  const [doctorAppoinmentsCopy, setDoctorAppoinmentsCopy] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const address = await CHECKI_IF_CONNECTED_LOAD();
      if (address) {
        const _doctorID = await GET_DOCTOR_ID(address);

        GET_DOCTOR_APPOINTMENTS_HISTORYS(_doctorID).then((appointment) => {
          console.log(appointment);
          setDoctorAppoinmentsCopy(appointment);
          setDoctorAppoinments(appointment);
        });
      }
    };

    fetchData();
  }, [address]);

  //FILTER
  const onHandleSearch = (value) => {
    const filteredNFTS = doctorAppoinments.filter(({ firstName }) =>
      firstName.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTS.length === 0) {
      setDoctorAppoinments(doctorAppoinmentsCopy);
    } else {
      setDoctorAppoinments(filteredNFTS);
    }
  };

  const onClearSearch = () => {
    if (doctorAppoinments?.length && doctorAppoinmentsCopy.length) {
      setDoctorAppoinments(doctorAppoinmentsCopy);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <Header
          name={"Your Appointment"}
          onHandleSearch={onHandleSearch}
          onClearSearch={onClearSearch}
        />
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <Table
                    thead={tableHead}
                    tableData={doctorAppoinments}
                    name={"appoinment"}
                    setOpenComponent={setOpenComponent}
                    setPatientDetails={setPatientDetails}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorAppointment;
