import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Hem</Link>
          </li>
          <li>
            <Link to="/kontakt">Kontakt</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
















// import React, { useState } from 'react';
// import { HomeOutlined, MailOutlined } from '@ant-design/icons';
// import { Menu } from 'antd';



// interface CustomMenuItemType {
//   key: string;
//   to: string;
//   label: string;
//   icon: React.ReactNode;
// }


// const items: CustomMenuItemType[] = [
//   {
//     label: 'Hem',
//     key: 'hem',
//     icon: <HomeOutlined />,
//     to: '/',
//   },
//   {
//     label: 'Kontakt',
//     key: 'kontakt',
//     icon: <MailOutlined />,
//     to: '/kontakt'
//   },
// ];

// const Header: React.FC = () => {
//   const [current, setCurrent] = useState('hem');

//   const onClick = (e: { key: React.Key }) => {
//     console.log('click ', e);
//     setCurrent(e.key.toString());
//   };

//   return (
//   <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}>
//     {items?.map((item) => (
//       <Menu.Item key={item.key} icon={item.icon}>
//         <Link to={item.to} key={item.key}>
//           {item.label}
//           </Link>
//       </Menu.Item>
//     ))}
//   </Menu>
//   );
// };

// export default Header;

// import { Link } from 'react-router-dom';