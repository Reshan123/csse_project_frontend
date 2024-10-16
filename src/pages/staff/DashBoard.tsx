import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import RecordsTable from './RecordsTable';
import AddMedicalRecord from './AddMedicalRecord'

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('Records', 'sub1', <FileOutlined />, [
    getItem('View Records', '2'),
    getItem('Add Record', '3'),
  ]),
  getItem('Appointments', '4', <DesktopOutlined />),
];

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1'); // Track selected menu item
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Function to render content based on the selected key
  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <div></div>;
      case '2':
        return <div><RecordsTable/></div>;
      case '3':
        return <div><AddMedicalRecord/></div>;
      case '4':
        return <div>Manage your appointments here.</div>;
      default:
        return <div>Welcome to the Dashboard!</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={(e) => setSelectedKey(e.key)} // Update selected key on menu item click
        />
      </Sider>
      <Layout>
        
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              {selectedKey === '1'
                ? 'Dashboard'
                : selectedKey === '2'
                ? 'View Records'
                : selectedKey === '3'
                ? 'Add Record'
                : 'Appointments'}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
