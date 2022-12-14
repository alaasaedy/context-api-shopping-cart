import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import storeItems from '../../data/items.json';
import { formatCurrency } from '../../utilities/formatCurrency';

export interface CartItemProps {
  id: number;
  quantity: number;
}

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();

  const cartItem = storeItems.find((item) => item.id === id);

  if (!cartItem) return null;

  return (
    <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
      <img
        src={cartItem.imgUrl}
        alt={cartItem.name}
        style={{ width: '125px', height: '75px', objectFit: 'cover' }}
      />
      <div className='me-auto'>
        <div>
          {cartItem.name}{' '}
          {quantity > 1 && (
            <span className='text-muted' style={{ fontSize: '0.65rem' }}>
              {quantity}x
            </span>
          )}
        </div>
        <div className='text-muted' style={{ fontSize: '0.75rem' }}>
          {formatCurrency(cartItem.price)}
        </div>
      </div>
      <div>{formatCurrency(cartItem.price * quantity)}</div>
      <Button
        variant='outline-danger'
        size='sm'
        onClick={() => removeFromCart(cartItem.id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
