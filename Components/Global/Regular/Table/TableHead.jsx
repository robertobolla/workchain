import React from "react";

const TableHead = ({ thead, name }) => {
  return (
    <thead>
      <tr>
        {thead?.map((item, index) => (
          <th key={item.name}>{item.name}</th>
        ))}

        {name == "patient" ? <th /> : ""}
      </tr>
    </thead>
  );
};

export default TableHead;
