import React, { useState } from "react";
import { Table, Button } from "antd";
import type { TableColumnsType } from "antd";
import ViewRecord from "../../pages/staff/ViewRecord";
import { useMedicalRecords } from "../../hooks/useMedicalRecordsHook";
import axios from "axios";
import { getAuthToken } from "../../api/Register/LoginApi";

export interface DataType {
  key: string | null;
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  address?: string;
  allergies?: string[];
  treatments?: string[]
  ongoingMedications?: string[];
  emergencyContactName?: string;
  emergencyContactNumber?: string;
}

const RecordsTable: React.FC = () => {
  const { data, loading, deleteMedicalRecord } = useMedicalRecords();
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);

  const handleViewClick = (record: DataType) => {
    setSelectedRecord(record);
  };

  const handleBack = async () => {
    setSelectedRecord(null);
  };



  const handleDeleteClick = async (record: DataType) => {
    deleteMedicalRecord(record);
  };


  const formattedData = data?.map(record => ({
    ...record,
    dateOfBirth: record.dateOfBirth.split('T')[0]
  })) || [];

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
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
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
        <>
          <Button type="link" onClick={() => handleViewClick(record)}>
            View
          </Button>
          <Button type="link" danger onClick={() => handleDeleteClick(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  // Inline styles for the table
  const tableHeaderStyle = {
    backgroundColor: '#0f766e',
    color: 'white',
  };

  return selectedRecord ? (
    <ViewRecord record={selectedRecord} onBack={handleBack} />
  ) : (
    <div style={{ backgroundColor: '#0b4541', padding: '16px' }}>
      <Table<DataType>
        columns={columns}
        dataSource={formattedData}
        loading={loading}
        pagination={{ pageSize: 5 }}
        rowKey="id" // Use 'id' as the rowKey
        components={{
          header: {
            cell: (props: any) => (
              <th {...props} style={{ ...props.style, ...tableHeaderStyle }} />
            ),
          },
        }}
      />

    </div>
  );
};

export default RecordsTable;