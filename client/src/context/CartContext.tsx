import { createContext, useContext, useReducer, ReactNode } from "react";

export interface CartItem {
    productName: string;
    quantity: number;
    price: number;
    total: number;
}

export interface CartState {
    items: CartItem[];
}

type CartAction = { type: 'ADD_TO_CART'; payload: CartItem };

interface CartContextType {
    cartState: CartState;
    addToCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within a CartProvider')
    }
    return context;
}

const cartReducer = (state: CartState, action: CartAction) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.productName === action.payload.productName
            );

            if (existingCartItemIndex !== -1) {
                const updatedItems = state.items.map((item, index) =>
                    index === existingCartItemIndex
                        ? {
                            ...item,
                            quantity: item.quantity + action.payload.quantity,
                            total: action.payload.price * (item.quantity + action.payload.quantity),
                        }
                        : item
                );

                return {
                    ...state,
                    items: updatedItems,
                };
            } else {
                const newItem = {
                    ...action.payload,
                    total: action.payload.price * action.payload.quantity,
                };

                return {
                    ...state,
                    items: [...state.items, newItem],
                };
            }
        }
        default:
            return state;
    }
};

interface CartProviderProps {
    children: ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
    const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

    const addToCart = (item: CartItem) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    return (
        <CartContext.Provider value={{ cartState, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartProvider, CartContext };