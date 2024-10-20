import React, { useState } from "react";
import { Table, Button } from "antd";
import type { TableColumnsType } from "antd";
import { useNavigate } from "react-router-dom";

export interface TreatmentType {
  id: string | null;
  patientID: string;
  aptNo: string;
  treatmentType: string;
  prescription: string;
  contactInfo: string;
}

interface TreatmentsTableProps {
  data: TreatmentType[];
  loading: boolean;
}

const TreatmentsTable: React.FC<TreatmentsTableProps> = ({ data, loading }) => {
  const navigate = useNavigate();

  const handleViewClick = (record: TreatmentType) => {
    // You can customize the navigation route as needed, using patientID or id.
    navigate(`/staff/home/${record.patientID}`);
  };

  const columns: TableColumnsType<TreatmentType> = [
    {
      title: "Patient ID",
      dataIndex: "patientID",
      sorter: (a, b) => a.patientID.localeCompare(b.patientID),
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "Appointment No",
    //   dataIndex: "aptNo",
    //   sorter: (a, b) => a.aptNo.localeCompare(b.aptNo),
    //   sortDirections: ["descend", "ascend"],
    // },
    {
      title: "Treatment Type",
      dataIndex: "treatmentType",
      sorter: (a, b) => a.treatmentType.localeCompare(b.treatmentType),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Prescription",
      dataIndex: "prescription",
    },
    {
      title: "Contact Info",
      dataIndex: "contactInfo",
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   render: (_, record) => (
    //     <Button type="link" onClick={() => handleViewClick(record)}>
    //       View
    //     </Button>
    //   ),
    // },
  ];

  return (
    <div className="bg-white">
      <h2 className="text-xl font-medium leading-6 text-gray-900 p-4">
        Treatment Details
      </h2>
      <Table<TreatmentType>
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 5 }}
        rowKey="aptNo" // You can use a unique key, such as aptNo or patientID
      />
    </div>
  );
};

export default TreatmentsTable;
