import React from "react";
import style from "./../Cart.module.scss";
const CartItem = ({ id, title, cost, imageUrl, onRemoveFromCart }) => {
  return (
    <div className={style.cartItem}>
      <img
        id={id}
        className={style.cartProduct}
        src={imageUrl}
        alt="cartProduct"
      />
      <div className={style.title}>
        <p>{title}</p>
        <b>{cost} серебра</b>
      </div>
      <img
        src="/common/krest.png"
        alt="delete"
        className={style.delete}
        onClick={() => onRemoveFromCart(id)}
      />
    </div>
  );
};

export default CartItem;
