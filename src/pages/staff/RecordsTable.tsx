// RecordsTable.tsx
import React, { useState } from "react";
import { Table, Button } from "antd";
import type { TableColumnsType } from "antd";
import ViewRecord from "./ViewRecord"; // Import the ViewRecord component
import { useMedicalRecords } from "../../hooks/useMedicalRecordsHook";

export interface DataType {
  key: string;
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  address?: string;
  allergies?: string[];
  ongoingMedications?: string[];
  emergencyContactName?: string;
  emergencyContactNumber?: string;
}

const RecordsTable: React.FC = () => {
  const { data, loading } = useMedicalRecords();
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);

  const handleViewClick = (record: DataType) => {
    setSelectedRecord(record);
  };

  const handleBack = () => {
    setSelectedRecord(null);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Patient ID",
      dataIndex: "patientId",
      sorter: (a, b) => a.patientId.localeCompare(b.patientId),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      sorter: (a, b) =>
        new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime(),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
      ],
      onFilter: (value, record) => record.gender === value,
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      sorter: (a, b) => a.contactNumber.localeCompare(b.contactNumber),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewClick(record)}>
          View
        </Button>
      ),
    },
  ];

  return selectedRecord ? (
    <ViewRecord record={selectedRecord} onBack={handleBack} />
  ) : (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 5 }}
      rowKey="key"
    />
  );
};

export default RecordsTable;
