import { Layout, theme } from "antd"

const { Header } = Layout;

const CustomHeader = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
        <h1>Adminpanel for RestaurantWebApplication</h1>
    </Header>
  )
}

export default CustomHeader