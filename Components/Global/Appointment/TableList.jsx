import React from "react";

const TableList = ({
  item,
  index,
  name,
  setDoctorDetails,
  setOpenComponent,
}) => {
  return (
    <tr key={item?.id}>
      <td className="patient-info ps-0">
        <span>
          <img src={item?.doctor.image} alt="" />
        </span>
        <span className="text-nowrap ms-2">
          {item?.doctor.firstName} {item?.doctor.lastName}
        </span>
      </td>
      <td>{item?.doctor.specialization}</td>

      <td>{item?.doctor.emailID}</td>
      <td>{item?.date}</td>

      <td>{item?.doctor.mobile}</td>
      <td>
        <a
          className="text-primary"
          href={
            item?.doctor.degrer.startsWith("http")
              ? item?.doctor.degrer
              : `https://${item?.doctor.degrer}`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {item?.doctor.degrer}
        </a>
      </td>
      <td>
        <a
          onClick={() => (
            setDoctorDetails(item?.doctor), setOpenComponent("DoctorDetails")
          )}
          className="btn btn-primary light btn-rounded mb-2 me-2"
        >
          View Profile
        </a>
      </td>
      <td>
        <a
          className={`btn ${
            item?.isOpen ? "btn-primary" : "btn-danger"
          } light btn-rounded mb-2 me-2`}
        >
          {item?.isOpen ? "Open" : "Close"}
        </a>
      </td>
    </tr>
  );
};

export default TableList;
