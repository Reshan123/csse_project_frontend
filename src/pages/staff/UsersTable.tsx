// RecordsTable.tsx
import React, { useState } from "react";
import { Table, Button } from "antd";
import type { TableColumnsType } from "antd";
import ViewRecord from "./ViewRecord"; // Import the ViewRecord component
import { useMedicalRecords } from "../../hooks/useMedicalRecordsHook";
import { useNavigate } from "react-router-dom";

export interface DataType {
  id: string;
  username: string;
  email: string;
  link: string;
}

interface UsersTableProps {
  data: DataType[];
  loading: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({ data,loading }) => {
 
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);
 const navigate = useNavigate(); 
  const handleViewClick = (record: DataType) => {
     navigate(`/patient/home/${record.id}`); 
  };

  const handleBack = () => {
    setSelectedRecord(null);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "User Name",
      dataIndex: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
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
    return (
      <Table<DataType>
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />
    );
};

export default UsersTable;
