import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import Header from "./Header";
import {
  DoctorDetails1,
  DoctorDetails2,
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

const Profile = ({ patientDetails, setOpenComponent, setDoctorDetails }) => {
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
        if (patientDetails) {
          CHECK_DOCTOR_REGISTERATION(patientDetails?.doctorAddress).then(
            (doctor) => {
              setDoctor(doctor);
            }
          );
          GET_PATIENT_APPOINTMENT_HISTORYS(patientDetails?.patientID).then(
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
  }, [patientDetails]);

  console.log(patientDetails);

  return (
    <div className="container-fluid">
      <Header
        patientDetails={patientDetails}
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
                  src={patientDetails?.image}
                />
                <div className="media-body align-items-center">
                  <div className="d-sm-flex d-block justify-content-between my-3 my-sm-0">
                    <div>
                      <h3 className="fs-22 text-black font-w600 mb-0">
                        {patientDetails?.firstName} {patientDetails?.lastName}
                      </h3>
                      <p className="mb-2 mb-sm-2">
                        {SHORTEN_ADDRESS(patientDetails?.walletAddress)}{" "}
                        <a
                          onClick={() =>
                            copyText(patientDetails?.walletAddress)
                          }
                        >
                          {" "}
                          <FaRegCopy />
                        </a>
                      </p>
                    </div>
                    <span>#P00-{patientDetails?.patientID}</span>
                  </div>
                  <a
                    href="javascript:void(0);"
                    className="btn btn-primary light btn-rounded mb-2"
                  >
                    <DoctorDetails3 /> {patientDetails?.city}
                  </a>
                </div>
              </div>
              <div className="row">
                <Card
                  icon={<DoctorDetails7 />}
                  title={"Language"}
                  name={patientDetails?.gender}
                />
                <Card
                  icon={<DoctorDetails4 />}
                  title={"Phone"}
                  name={patientDetails?.mobile}
                />
                <Card
                  icon={<DoctorDetails5 />}
                  title={"EmailID"}
                  name={patientDetails?.emailID}
                />
                <Card
                  icon={<DoctorDetails3 />}
                  title={"Date of Birth "}
                  name={patientDetails?.birth}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="widget-timeline-icon2">
                <div className="card-header border-0 pb-0 margin-left">
                  <h4 className="fs-20 font-w600 ">Description</h4>
                  <a href="javascript:void(0);">
                    <Profile1 />
                  </a>
                </div>
                <div className="card-body fs-18 font-w400 text-black-100 margin-left2">
                  {patientDetails?.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
