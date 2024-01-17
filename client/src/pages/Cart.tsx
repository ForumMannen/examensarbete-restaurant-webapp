import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart: React.FC = () => {
    const { cartState } = useContext(CartContext) || {};

    if(!cartState){
        return <div>Error: CartContext is undefined</div>
    }

  return (
    <div>
        <h2>Kundvagn</h2>
        {cartState.items.map((item, index) => (
            <div key={index}>{item.productName} - Antal: {item.quantity} - Pris: {item.price} kr</div>
        ))}
        <button>Betala</button>
    </div>
  )
}

export default Cart