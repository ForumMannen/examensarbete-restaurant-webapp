import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import useStripeIntegration from '../hooks/useStripeIntegration';

const Cart: React.FC = () => {
    const { cartState } = useContext(CartContext) || {};
    const handlePayment = useStripeIntegration();

    if(!cartState){
        return <div>Error: CartContext is undefined</div>
    }

    const handleButtonClick = () => {
      const orderData = cartState;
      handlePayment(orderData);
    }

  return (
    <div>
        <h2>Kundvagn</h2>
        {cartState.items.map((item, index) => (
            <div key={index}>{item.productName} - Antal: {item.quantity} - Pris: {item.price} kr</div>
        ))}
        <button onClick={handleButtonClick}>Betala</button>
    </div>
  )
}

export default Cart