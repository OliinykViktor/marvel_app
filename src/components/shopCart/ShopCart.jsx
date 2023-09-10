import { useState } from 'react';

import CartItem from './components/cartItem';

import { HiShoppingCart } from 'react-icons/hi';

import './ShopCart.scss';

const ShopCart = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const onClickCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <>
      <HiShoppingCart
        className={`shop__cart ${cartOpen && 'active'}`}
        onClick={onClickCart}
      />
      {cartOpen && <CartItem onClickCart={onClickCart} />}
    </>
  );
};

export default ShopCart;
