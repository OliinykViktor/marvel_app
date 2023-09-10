import { useCart } from '../../../context/CartContext';

import { AiFillDelete, AiFillMinusSquare, AiFillPlusSquare, AiFillCloseSquare } from 'react-icons/ai';

import './cartItem.scss';
import { useState } from 'react';
import { useEffect } from 'react';

const CartItem = ({ onClickCart }) => {
  const { removeCart, cartItems } = useCart();
  const [priceTotal, setPriceTotal] = useState(0)

  const calculateTotal = () => {
    let total = 0;
    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        total += item.price * item.quantity;
      })
      setPriceTotal(total.toFixed(2))  
    }else{
      setPriceTotal(total)
    }
  }

  useEffect(() => {
    calculateTotal()
  }, [cartItems])

  const handleIncreaseQuantity = (item) => {
    if (item.quantity < 50) {
      item.quantity++;
      calculateTotal()
    }
  }

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity--;
      calculateTotal()
    }
  }

  const formattedPrice = (item) => {
    return (item.price * item.quantity).toFixed(2)
  } 

  const items = cartItems.map((item) => (
    <div key={item.id}>
      <div className="cart__info">
        <img src={item.thumbnail}
          alt={item.name}
          className='cart__img' />
        <span>{item.name}</span>
        <AiFillDelete className='cart__icon'
          onClick={() => removeCart(item.id)} />
      </div>
      <div className="cart__info" key={item.id}>
        <div className="cart__quantity">
          <AiFillMinusSquare className='cart__icon'
            onClick={() => handleDecreaseQuantity(item)} />
          <input className='cart__input'
            type="number"
            value={item.quantity} />
          <AiFillPlusSquare className='cart__icon'
            onClick={() => handleIncreaseQuantity(item)} />
        </div>
        <span className='cart__subtitle'>{formattedPrice(item)}</span>
      </div>
    </div>
  ))
  return (
    <div className="cart__modal">
      <div className="cart__modal__content">
        <AiFillCloseSquare className="cart__icon close-button"
          onClick={onClickCart}
        />
        <h2 className='cart__title'>Your Order</h2>
        {
          items.length > 0
            ? items
            : <div className='cart__subtitle'>Empty...</div>
        }
        <div className="cart__total">
          <span>Total:</span>
          <div className="cart__subtitle">${priceTotal}</div>
        </div>
        <button className="button button__main">
          <div className="inner">Proceed to Checkout</div>
        </button>
      </div>
    </div>
  )
};

export default CartItem;