import React, { useState } from 'react';
import {
  BarChartOutlined,
  CloudUploadOutlined,
  PayCircleOutlined,
  UserOutlined,
  UnorderedListOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
// import { useAdminContext } from "../context/AdminContext";

//Import Pages within the Dashboard
import RecipesPage from './Dashboard-pages/RecipesPage';
import Ingredients from './Dashboard-pages/Ingredients';
import OnlineMenu from './Dashboard-pages/OnlineMenu';
import Orders from './Dashboard-pages/Orders';
import Payments from './Dashboard-pages/Payments';
import UsersPage from './Dashboard-pages/UsersPage';
import Settings from './Dashboard-pages/Settings';
import CustomHeader from './Dashboard-components/Header';
import CustomFooter from './Dashboard-components/Footer';
import { useDashboardData } from '../hooks/fetchDashboardData';

const { Content, Sider } = Layout;

//Change depending on what kind of customer
const NavItems = ["Recipes", "Ingredients", "OnlineMenu", "Orders", "Payments", "Users", "Settings"];

const Dashboard: React.FC = () => {
  const [selectedNavItem, setSelectedNavItem] = useState<string>(NavItems[0]);
  // const { logoutAdmin } = useAdminContext();
  const { dashboardData } = useDashboardData();
  const { recipes } = dashboardData;
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleNavItemClick = (item: string) => {
    setSelectedNavItem(item);
  }

  const getPageComponent = (selected: string) => {
    switch (selected) {
      case 'Recipes':
        return <RecipesPage recipes={recipes}/>;
        case 'Ingredients':
          return <Ingredients />;
          case 'OnlineMenu':
            return <OnlineMenu />;
            case 'Orders':
              return <Orders />;
              case 'Payments':
                return <Payments />;
                case 'Users':
                  return <UsersPage />;
                  case 'Settings':
                    return <Settings />;
      default:
        return null;
    }
  }

  const items: MenuProps['items'] = [
    UnorderedListOutlined,
    UnorderedListOutlined,
    CloudUploadOutlined,
    BarChartOutlined,
    PayCircleOutlined,
    UserOutlined,
    SettingOutlined,
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: NavItems[index],
    onClick: () => handleNavItemClick(NavItems[index]),
  }));

  return (
    <Layout hasSider>
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
        <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
          <button
            style={{
              color: 'white',
              background: 'red',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}
            // onClick={logoutAdmin}
          >
            Logout
          </button>
        </div>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <CustomHeader />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {getPageComponent(selectedNavItem)}
          </div>
        </Content>
        <CustomFooter />
      </Layout>
    </Layout>
  );
};

// import { useNavigate } from "react-router-dom";
// import { useAdminContext } from "../context/AdminContext";

// function Dashboard() {
//   const { logoutAdmin } = useAdminContext();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logoutAdmin();
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
//   return (
//     <div>
//       <button onClick={handleLogout}>Logga ut!</button>
//     </div>
//   )
// }

export default Dashboard