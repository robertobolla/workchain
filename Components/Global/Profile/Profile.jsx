import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import Header from "./Header";
import {
  DoctorDetails2,
  DoctorDetails1,
  DoctorDetails3,
  DoctorDetails4,
  DoctorDetails5,
  DoctorDetails6,
  DoctorDetails7,
  Profile1,
} from "../../SVG/index";
import {
  FaStethoscope,
  TiSocialTwitter,
  TiSocialFacebook,
  TiSocialLinkedin,
} from "../../ReactICON/index";
import { FaRegCopy } from "../../ReactICON/index";
import {
  SHORTEN_ADDRESS,
  CHECK_DOCTOR_REGISTERATION,
  GET_PATIENT_APPOINTMENT,
  GET_PATIENT_APPOINTMENT_HISTORYS,
  CHECKI_IF_CONNECTED_LOAD,
} from "../../../Context/constants";
import Card from "./Card";

const Profile = ({ user, setOpenComponent, setDoctorDetails }) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const [doctor, setDoctor] = useState();
  const [patientAppoinment, setPatientAppoinment] = useState();

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    notifySuccess("Copied successfully");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          CHECK_DOCTOR_REGISTERATION(user?.doctorAddress).then((doctor) => {
            setDoctor(doctor);
          });
          GET_PATIENT_APPOINTMENT_HISTORYS(user?.patientID).then(
            (appoinment) => {
              setPatientAppoinment(appoinment);
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="container-fluid">
      <Header
        user={user}
        doctor={doctor}
        patientAppoinment={patientAppoinment}
      />
      <div className="row">
        <div className="col-xl-6 col-xxl-8">
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
                        {SHORTEN_ADDRESS(user?.walletAddress)}{" "}
                        <a onClick={() => copyText(user?.walletAddress)}>
                          {" "}
                          <FaRegCopy />
                        </a>
                      </p>
                    </div>
                    <span>#P00-{user?.patientID}</span>
                  </div>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-primary light btn-rounded mb-2"
                  >
                    {user?.city}
                  </a>
                </div>
              </div>
              <div className="row">
                <Card
                  icon={<DoctorDetails6 />}
                  title={"Languages"}
                  name={user?.gender}
                />
                <Card
                  icon={<DoctorDetails4 />}
                  title={"Phone"}
                  name={user?.mobile}
                />
                <Card
                  icon={<DoctorDetails5 />}
                  title={"EmailID"}
                  name={user?.emailID}
                />
                <Card
                  icon={<DoctorDetails3 />}
                  title={"Date of Birth "}
                  name={user?.birth}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-md-6">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="font-w600 fs-20">
                About {user?.firstName} {user?.lastName}
              </h4>
              <a href="javascript:void(0);">
                <Profile1 />
              </a>
            </div>
            <div className="card-body fs-14 text-black font-w300">
              {user?.message}
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
