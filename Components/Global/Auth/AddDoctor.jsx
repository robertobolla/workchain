import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import { UPLOAD_IPFS_IMAGE } from "../../../Context/constants";
import Input from "./../Regular/Input";

import { useStateContext } from "../../../Context/index";

const AddDoctor = ({ setAddDocotr }) => {
  const { ADD_DOCTOR, setLoader, notifySuccess, notifyError } =
    useStateContext();

  const [doctor, setDoctor] = useState({
    title: " ",
    firstName: "",
    lastName: "",
    gender: "-",
    degrer: "",
    yourAddress: "",
    designation: "",
    lastWork: "-",
    mobile: "",
    emailID: "",
    collageName: "-",
    collageID: "-",
    joiningYear: "10/10/2024",
    endYear: "10/10/2024",
    specialization: "",
    registrationID: "-",
    collageAddress: "-",
    walletAddress: "",
    image: "",
    biography: "",
  });

  const handleImageChange = async (event) => {
    try {
      setLoader(true);
      const file = event.target.files[0];
      if (file) {
        const imgUrl = await UPLOAD_IPFS_IMAGE(file);
        setDoctor({ ...doctor, image: imgUrl });
        setLoader(false);
        notifySuccess("Image uploaded successfully");
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      notifyError("Failed, check your Pinata API Keys");
    }
  };

  return (
    <div
      className="modal "
      style={{
        display: "block",
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Professional</h5>
            <button className="btn-close" onClick={() => setAddDocotr(false)} />
          </div>
          <div className="modal-body">
            <div>
              <div className="row">
                <Input
                  name={"Name"}
                  type={"text"}
                  handleChange={(e) =>
                    setDoctor({ ...doctor, firstName: e.target.value })
                  }
                />
                <Input
                  name={"Last Name"}
                  type={"text"}
                  handleChange={(e) =>
                    setDoctor({ ...doctor, lastName: e.target.value })
                  }
                />
                <Input
                  name={"Web"}
                  type={"text"}
                  handleChange={(e) =>
                    setDoctor({ ...doctor, degrer: e.target.value })
                  }
                />
                <Input
                  name={"Profession"}
                  type={"text"}
                  handleChange={(e) =>
                    setDoctor({ ...doctor, specialization: e.target.value })
                  }
                />
                <div className="col-xl-12">
                  <div className="form-group">
                    <label className="col-form-label">Country :</label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows={1}
                      defaultValue={""}
                      onChange={(e) =>
                        setDoctor({ ...doctor, yourAddress: e.target.value })
                      }
                    />
                  </div>
                </div>{" "}
                <Input
                  name={"Language"}
                  type={"text"}
                  handleChange={(e) =>
                    setDoctor({ ...doctor, designation: e.target.value })
                  }
                />
                <Input
                  name={"Linkedin (opcional)"}
                  type={"text"}
                  handleChange={(e) =>
                    setDoctor({ ...doctor, lastWork: e.target.value })
                  }
                />
                <Input
                  name={"Mobile"}
                  type={"text"}
                  handleChange={(e) =>
                    setDoctor({ ...doctor, mobile: e.target.value })
                  }
                />
                <Input
                  name={"EmailID"}
                  type={"email"}
                  handleChange={(e) =>
                    setDoctor({ ...doctor, emailID: e.target.value })
                  }
                />
                <div className="col-xl-12">
                  <div className="form-group">
                    <label className="col-form-label">Wallet Address</label>
                    <input
                      size={16}
                      className="form-control"
                      type="text"
                      onChange={(e) =>
                        setDoctor({ ...doctor, walletAddress: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="form-group">
                    <label className="col-form-label">Upload Profile</label>
                    <input
                      className="form-control"
                      id="file"
                      onChange={handleImageChange}
                      type="file"
                    />
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="form-group">
                    <label className="col-form-label">Biography:</label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea2"
                      rows={3}
                      onChange={(e) =>
                        setDoctor({ ...doctor, biography: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={() => ADD_DOCTOR(doctor)}
              className="btn btn-primary"
            >
              Add Professional
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
