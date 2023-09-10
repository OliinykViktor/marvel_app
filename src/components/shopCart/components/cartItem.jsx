import { useCart } from '../../../context/CartContext';

import { AiFillDelete, AiFillMinusSquare, AiFillPlusSquare, AiFillCloseSquare } from 'react-icons/ai';

import './cartItem.scss';

const CartItem = ({ onClickCart, cartOpen }) => {
  const { addCart, removeCart, clearCart, cartItems } = useCart();


  const items = cartItems.map((item) => (
    <>

      <div className="cart__info">
        <img src={item.thumbnail}
          alt={item.name}
          className='cart__img' />
        <span>{item.name}</span>
        <AiFillDelete className='cart__icon' />
      </div>
      <div className="cart__info">
        <div className="cart__quantity">
          <AiFillMinusSquare className='cart__icon' />
          <input className='cart__input'
            type="number"
            value={item.quantity} />
          <AiFillPlusSquare className='cart__icon' />
        </div>
        <span className='cart__subtitle'>$4545454545</span>
      </div>
      <div className="cart__total">
        <span>Total:</span>
        <div className="cart__subtitle">$454545454</div>
      </div>

    </>
  ))
  return (
    <div className="cart__modal">
      <div className="cart__modal__content">
        <AiFillCloseSquare className="cart__icon close-button"
          onClick={onClickCart}
        />
        <h2 className='cart__title'>Your Order</h2>
        {items.length > 0 ? items: <div className='cart__subtitle'>Empty...</div>}
        <button className="button button__main"><div className="inner">Proceed to Checkout</div></button>
      </div>
    </div>
  )
};

export default CartItem;