import React from "react";
import AppContext from "../context";
import style from "./Card/Card.module.scss";

const Info = ({ description, action }) => {
  const { setOnCartOpen } = React.useContext(AppContext);
  return (
    <>
      <div className={style.emptyCart}>
        <img
          src="common/empty-cart.png"
          alt="emptyCart"
          className={style.emptyCartImg}
        />
        <h2>{description}</h2>
      </div>
      <div className={style.buttonReturn}>
        <button onClick={() => setOnCartOpen(false)}>{action}</button>
        <img src="/common/rightarrow.png" alt="arrow" className={style.arrow} />
      </div>
    </>
  );
};

export default Info;
