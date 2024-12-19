import React from "react";

const TableList = ({ item, index, name }) => {
  return (
    <tr key={index} className="btn-reveal-trigger">
      <td className="py-2">{item?.message}</td>
      <td className="py-2">#N00-{item?.notificationId}</td>
      <td className="py-2">{item?.userAddress}</td>
      <td className="py-2">{item?.date}</td>
      <td className="py-2">
        {item?.categoryType === "Doctor"
          ? "Professional"
          : item?.categoryType === "Patient"
          ? "User"
          : item?.categoryType}
      </td>
    </tr>
  );
};

export default TableList;
