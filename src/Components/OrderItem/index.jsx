import React from "react";
import style from "./OrderItem.module.scss";

const OrderItem = ({ cost, title, imageUrl }) => {
  return (
    <div className={style.mainOrderItem}>
      <div className={style.liOrderItem}>
        <div className={style.imageblock}>
          <img src={imageUrl} alt="logo" className={style.imageOrder} />
          <p>{title}</p>
        </div>
        <div className={style.liCost}>
          <p>Стоимость: </p>
          <p>{cost} руб</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
