import React, { useState } from "react";
import { Table, Button, Input } from "antd";
import type { TableColumnsType } from "antd";
import ViewRecord from "../../pages/staff/ViewRecord";
import { useMedicalRecords } from "../../hooks/useMedicalRecordsHook";

export interface DataType {
  key: string | null;
  id: string;
  userId: string;
  patientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  address?: string;
  allergies?: string[];
  treatments?: string[];
  ongoingMedications?: string[];
  emergencyContactName?: string;
  emergencyContactNumber?: string;
}

const RecordsTable: React.FC = () => {
  const { data, loading, deleteMedicalRecord } = useMedicalRecords();
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleViewClick = (record: DataType) => {
    setSelectedRecord(record);
  };

  const handleBack = async () => {
    setSelectedRecord(null);
  };

  const handleDeleteClick = async (record: DataType) => {
    deleteMedicalRecord(record);
  };

  const formattedData = data?.map((record) => ({
    ...record,
    dateOfBirth: record.dateOfBirth.split("T")[0],
  })) || [];

  // Filtered data based on the search term
  const filteredData = formattedData.filter((record) =>
    record.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    backgroundColor: "#0f766e",
    color: "white",
  };

  return selectedRecord ? (
    <ViewRecord record={selectedRecord} onBack={handleBack} />
  ) : (
    <div style={{ backgroundColor: "#0b4541", padding: "16px" }}>
      {/* Search Bar */}
      <Input
        placeholder="Search by Patient ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <Table<DataType>
        columns={columns}
        dataSource={filteredData} // Use filtered data
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
