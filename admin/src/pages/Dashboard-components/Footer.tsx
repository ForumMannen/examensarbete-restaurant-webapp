import { Layout } from "antd"

const { Footer } = Layout;

const CustomFooter = () => {

  return (
    <Footer style={{ textAlign: 'center' }}>
          Linus Develop ©{new Date().getFullYear()} Examensarbete
    </Footer>
  )
}

export default CustomFooter