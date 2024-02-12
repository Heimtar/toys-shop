import React from "react";
import style from "./Cart.module.scss";
import CartItem from "./CartItem";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Cart = ({
  setItemInCart,
  onClose,
  itemInCart,
  onRemoveFromCart,
  summCost,
  onCartOpen,
}) => {
  const [isOrderComplite, setIsOrderComlite] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);

  let discount = summCost * 0.05;

  const onClickOrder = async () => {
    try {
      const { data } = await axios.post("https://test-api-xih4.onrender.com/orders", {
        items: itemInCart,
      });
      setOrderId(data.id);
      setItemInCart([]);
      setIsOrderComlite(true);

      for (let i = 0; i < itemInCart.length; i++) {
        const item = itemInCart[i];
        await axios.delete("https://test-api-xih4.onrender.com/cart/" + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert("Не удалось создать заказ");
    }
  };

  return (
    <div
      className={`${style.overlay} ${onCartOpen ? style.overlayVisible : ""}`}
    >
      <div className={style.mainCart}>
        <div className={style.aboveInfo}>
          <h2>Корзина</h2>
          <img
            src="/common/krest.png"
            alt="close"
            className={style.close}
            onClick={onClose}
          />
        </div>
        {itemInCart.length > 0 ? (
          <div className={style.cardBlock}>
            {itemInCart.map((obj) => (
              <CartItem
                key={obj.id}
                id={obj.id}
                title={obj.title}
                cost={obj.cost}
                imageUrl={obj.imageUrl}
                onRemoveFromCart={onRemoveFromCart}
              />
            ))}
          </div>
        ) : (
          <div className={style.emptyCart}>
            <img
              src={
                isOrderComplite
                  ? "common/order-complite.png"
                  : "common/empty-cart.png"
              }
              alt={isOrderComplite ? "emptyCart" : "order"}
              className={style.emptyCartImg}
            />
            <h2>
              {isOrderComplite ? `Заказ №${orderId}оформлен` : "Корзина пуста"}
            </h2>
            <p>
              {isOrderComplite
                ? "Спасибо за покупку"
                : "Посмотрите наши новинки"}
            </p>
          </div>
        )}
        {itemInCart.length > 0 ? (
          <div className={style.cost}>
            <ul className={style.costUl}>
              <li className={style.costLi}>
                <span>Итоговая сумма</span>
                <div></div>
                <b>{summCost} руб</b>
              </li>

              <li className={style.costLi}>
                <span>Скидка</span>
                <div></div>
                <b>{discount} руб</b>
              </li>
            </ul>

            <div className={style.buttonBye}>
              <button onClick={onClickOrder}>Купить</button>
              <img
                src="/common/rightarrow.png"
                alt="arrow"
                className={style.arrow}
              />
            </div>
          </div>
        ) : (
          <div className={style.buttonReturn}>
            <img
              src="/common/rightarrow.png"
              alt="arrow"
              className={style.arrow}
            />
            <button onClick={onClose}>Вернутся к покупкам</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
