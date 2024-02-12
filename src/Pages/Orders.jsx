import React from "react";

import OrderItem from "../Components/OrderItem";

import AppContext from "../context";

import styles from "./Orders.module.scss";


const Orders = () => {
  const { itemsInOrderReduse } = React.useContext(AppContext);
  return (
    <div className={styles.mainOrder}>
      <h1>Заказы</h1>
            
      <ul>
        {itemsInOrderReduse.map((obj) => (
          <li className={styles.liOrder}>
            <OrderItem title={obj.title} cost={obj.cost} imageUrl={obj.imageUrl} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
