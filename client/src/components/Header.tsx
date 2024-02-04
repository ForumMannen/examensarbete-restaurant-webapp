import { Link } from 'react-router-dom';
import { ShoppingTwoTone } from '@ant-design/icons';
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
            <Link to="/contact">Kontakt</Link>
          </li>
        </ul>
        <Link to="cart"><ShoppingTwoTone /></Link>
      </nav>
    </header>
  )
}

export default Header