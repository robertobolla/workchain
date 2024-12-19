import React from "react";
import { FaUser } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";

import {
  HeroCard1,
  HeroCard2,
  HeroCard3,
  HeroCard4,
  HeroCard5,
  HeroCard6,
  HeroCard7,
  HeroCard8,
} from "../../SVG/index";
import { FaArrowRightLong } from "../../ReactICON/index";
import Card from "./Card";
import Card2 from "./Card2";
import Steps from "./Steps";

const Auth = ({
  setAddDocotr,
  setAddPatient,
  address,
  connectMetaMask,
  SHORTEN_ADDRESS,
}) => {
  return (
    <div className="auth-modal">
      <div className="authincation h-100">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <div className="text-center mb-3">
                        <a>
                          <img src="images/logo-full.png" alt="" />
                        </a>
                      </div>

                      <Card
                        handleClick={address ? setAddPatient : connectMetaMask}
                        title={"User Registration"}
                        patient={"Get the service you are looking for"}
                        number={"40"}
                        iconTwo={<FaUser className="fs-26" />}
                        classStyle={"bg-success"}
                      />
                      <Card2
                        handleClick={address ? setAddDocotr : connectMetaMask}
                        title={"Professional Registration"}
                        patient={"Increase your income"}
                        number={"200"}
                        iconOne={<HeroCard1 />}
                        iconTwo={<FaUserGraduate className="fs-26" />}
                        classStyle={"bg-danger "}
                      />
                      <div className="new-account mt-3">
                        <p className="mb-0">
                          Welcome to <a className="text-primary">WORKCHAIN:</a>{" "}
                          We are proud to help connect professionals with people
                          in need of services around the world.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
