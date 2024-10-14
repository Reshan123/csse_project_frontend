import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import axios from 'axios';

interface DataType {
  key: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dateOfBirth',
    sorter: (a, b) => new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime(),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'Male' },
      { text: 'Female', value: 'Female' },
    ],
    onFilter: (value, record) => record.gender === value,
  },
  {
    title: 'Contact Number',
    dataIndex: 'contactNumber',
    sorter: (a, b) => a.contactNumber.localeCompare(b.contactNumber),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: (_, record) => <Button type="link">View</Button>,
  },
];

const ViewRecords: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('authToken='))
          ?.split('=')[1];

        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('/api/medicalRecords/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedData = response.data.map((record: any) => ({
          key: record.patientId,
          firstName: record.firstName,
          lastName: record.lastName,
          dateOfBirth: record.dateOfBirth,
          gender: record.gender,
          contactNumber: record.contactNumber,
        }));

        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      loading={loading}
      onChange={onChange}
      pagination={{ pageSize: 5 }}
      rowKey="key"
    />
  );
};

export default ViewRecords;
