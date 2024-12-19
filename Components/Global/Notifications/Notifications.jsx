import React, { useEffect, useState } from "react";

///INTERNAL IMPORT
import Table from "./Table";

const Notifications = ({ notifications }) => {
  const tableHead = [
    {
      name: "Notifications",
    },
    {
      name: "ID",
    },
    {
      name: "Address",
    },
    {
      name: "date",
    },
    {
      name: "Type",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="javascript:void(0)">Notification</a>
          </li>
          <li className="breadcrumb-item active">
            <a href="javascript:void(0)">All Notifications</a>
          </li>
        </ol>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card overflow-hidden">
            <div className="card-body p-0">
              <div className="table-responsive">
                <Table
                  thead={tableHead}
                  tableData={notifications}
                  name={"All Notifications"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
