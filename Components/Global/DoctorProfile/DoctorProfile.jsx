import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLinkedin } from "react-icons/fa";

//INTERNAL IMPORT
import Header from "./Header";
import AppoinmentList from "./AppoinmentList";
import Card from "./Card";
import Update from "./Update";
import UpdateStatus from "./UpdateStatus";
import {
  DoctorDetails2,
  DoctorDetails1,
  DoctorDetails3,
  DoctorDetails4,
  DoctorDetails5,
  DoctorDetails6,
  DoctorDetails7,
} from "../../SVG/index";
import { FaRegCopy } from "../../ReactICON/index";
import {
  SHORTEN_ADDRESS,
  GET_DOCTOR_APPOINTMENTS_HISTORYS,
  GET_ALL_REGISTERED_MEDICINES,
  CHECK_DOCTOR_REGISTERATION,
} from "../../../Context/constants";

import { useStateContext } from "../../../Context/index";

const DoctorProfile = ({ setPatientDetails, setOpenComponent, user }) => {
  const {
    CHECKI_IF_CONNECTED_LOAD,
    address,
    BOOK_APPOINTMENT,
    PRESCRIBE_MEDICINE,
    UPDATE_PATIENT_MEDICAL_HISTORY,
  } = useStateContext();

  const [doctorAppoinments, setDoctorAppoinments] = useState();
  const [prescribeMedicine, setPrescribeMedicine] = useState(false);
  const [updateCondition, setUpdateCondition] = useState(false);
  const [registerMedicine, setRegisterMedicine] = useState();
  const [doctorInfo, setDoctorInfo] = useState();

  const [prescribeDoctor, setPrescribeDoctor] = useState({
    medicineID: "",
    patientID: "",
  });
  const [conditionUpdate, setConditionUpdate] = useState({
    message: "",
    patientID: "",
  });

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    notifySuccess("Copied successfully");
  };

  useEffect(() => {
    const fetchData = async () => {
      const address = await CHECKI_IF_CONNECTED_LOAD();
      if (user?.doctorID) {
        GET_DOCTOR_APPOINTMENTS_HISTORYS(user.doctorID).then((appointment) => {
          const _newArray = appointment.filter(
            (appointment) => appointment.isOpen
          );
          setDoctorAppoinments(_newArray);
        });
      }
    };

    fetchData();
  }, [user?.doctorID]);

  useEffect(() => {
    const fetchData = async () => {
      const address = await CHECKI_IF_CONNECTED_LOAD();
      if (address) {
        GET_ALL_REGISTERED_MEDICINES().then((medicine) => {
          setRegisterMedicine(medicine);
        });
      }
    };

    fetchData();
  }, [address]);

  return (
    <div className="container-fluid">
      <Header setOpenComponent={setOpenComponent} />

      <div className="row">
        <div className="col-xl-3 col-lg-4 col-xxl-4">
          <div className="card">
            {doctorAppoinments?.length ? (
              <div className="card-header border-0 pb-0">
                <h4 className="fs-20 font-w600 mb-0">Appointments List</h4>
              </div>
            ) : (
              ""
            )}

            <div className="card-body px-0 pt-4">
              <div
                id="DZ_W_Todo2"
                className="widget-media dz-scroll px-4 height370"
              >
                {doctorAppoinments?.length ? (
                  <ul className="timeline">
                    {doctorAppoinments?.map((item, index) => (
                      <AppoinmentList
                        item={item}
                        index={index}
                        setPrescribeMedicine={setPrescribeMedicine}
                        prescribeDoctor={prescribeDoctor}
                        setPrescribeDoctor={setPrescribeDoctor}
                        setUpdateCondition={setUpdateCondition}
                        setConditionUpdate={setConditionUpdate}
                        conditionUpdate={conditionUpdate}
                      />
                    ))}
                  </ul>
                ) : (
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    src="appointment.jpg"
                    alt="Appointment"
                  />
                )}
              </div>
              <div
                style={{
                  marginTop: "3rem",
                  padding: "1rem",
                }}
              >
                <Card
                  name={user?.appointmentCount}
                  title={"Total Appointment:"}
                  icon={<DoctorDetails3 />}
                />
                <Card
                  name={user?.successfulTreatmentCount}
                  title={"Successful Treatment:"}
                  icon={<DoctorDetails3 />}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-xxl-8 col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="media d-sm-flex d-block text-center text-sm-start pb-4 mb-4 border-bottom">
                <img
                  alt="image"
                  className="rounded me-sm-4 me-0"
                  width={130}
                  src={user?.image}
                />
                <div className="media-body align-items-center">
                  <div className="d-sm-flex d-block justify-content-between my-3 my-sm-0">
                    <div>
                      <h3 className="fs-22 text-black font-w600 mb-0">
                        {user?.firstName} {user?.lastName}
                      </h3>
                      <p className="mb-2 mb-sm-2">
                        {SHORTEN_ADDRESS(user?.accountAddress)}{" "}
                        <a onClick={() => copyText(user?.accountAddress)}>
                          {" "}
                          <FaRegCopy />
                        </a>
                      </p>
                    </div>
                    <span>#P-00{user?.doctorID}</span>
                  </div>

                  <a className="btn btn-primary light btn-rounded mb-2">
                    <DoctorDetails2 /> {user?.specialization}
                  </a>
                  <a
                    className="btn btn-primary light btn-rounded mb-2"
                    href={`https://${user?.degrer}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "underline" }}
                  >
                    <DoctorDetails2 />
                    &nbsp; {user?.degrer}
                  </a>
                </div>
              </div>
              <div className="row">
                <Card
                  name={user?.yourAddress}
                  title={"Country"}
                  icon={<DoctorDetails3 />}
                />
                <Card
                  name={user?.mobile}
                  title={"Phone"}
                  icon={<DoctorDetails4 />}
                />
                <Card
                  name={user?.emailID}
                  title={"Email"}
                  icon={<DoctorDetails5 />}
                />
                <Card
                  name={user?.designation}
                  title={"Language"}
                  icon={<DoctorDetails6 />}
                />
                <Card
                  name={
                    <a
                      href={`https://${user?.degrer}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#32d1e3", textDecoration: "underline" }}
                    >
                      {user?.degrer}
                    </a>
                  }
                  title={"Web"}
                  icon={<DoctorDetails2 />}
                />
                <Card
                  name={
                    <a
                      href={`https://www.linkedin.com/in/${user?.lastWork}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#32d1e3", textDecoration: "underline" }}
                    >
                      {user?.lastWork}
                    </a>
                  }
                  title={"Linkedin"}
                  icon={<FaLinkedin className="fs-20 text-primary icon-edit" />}
                />
              </div>
              <hr />

              <div className="mt-5">
                <h4 className="fs-20 font-w600">
                  About {user?.firstName} {user?.lastName}
                </h4>
                <div className="staff-info">
                  <p>{user?.biography}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
