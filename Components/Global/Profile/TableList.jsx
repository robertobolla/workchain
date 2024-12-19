import React from "react";

const TableList = ({
  item,

  setOpenComponent,
  setDoctorDetails,
}) => {
  return (
    <tr key={item?.doctorID}>
      <td>#D-00{item?.doctorID}</td>
      <td className="patient-info ps-0">
        <span>
          <img src={item?.image} alt="" />
        </span>
        <span className="text-nowrap ms-2">
          {item?.firstName} {item?.lastName}
        </span>
      </td>
      <td>{item?.specialization}</td>
      <td>{item?.emailID}</td>
      <td>
        <a
          className="text-primary"
          href={
            item?.degrer.startsWith("http")
              ? item?.degrer
              : `https://${item?.degrer}`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {item?.degrer}
        </a>
      </td>
      <td>
        <a
          href="javascript:void(0);"
          className={`btn light btn-rounded btn-sm ${
            item?.appointmentCount >= 1
              ? " btn-primary text-nowrap"
              : "btn-secondary"
          } `}
        >
          {item?.appointmentCount >= 1
            ? `${item?.appointmentCount} Appointment`
            : "0 Appointment"}
        </a>
      </td>
      <td>
        <span className="font-w500">{item?.mobile}</span>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <a
            onClick={() => (
              setDoctorDetails(item), setOpenComponent("DoctorDetails")
            )}
            className="dropdown-item text-primary font-w600"
            href="javascript:void(0);"
          >
            View Profile
          </a>
        </div>
      </td>
    </tr>
  );
};

export default TableList;
