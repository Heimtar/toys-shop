import React from "react";
import style from "./Favorite.module.scss";

const Favorite = ({ id, title, cost, imageUrl }) => {
  return (
    <div className={style.mainCard}>
      <img
        src="/common/favoriteheart.svg"
        alt="favorite"
        className={style.favoriteSvg}
      />
      <img src={imageUrl} alt="imgCardItem" className={style.imgCardItem} />
      <>
        <h3>{title}</h3>
        <div className={style.cost}>
          <p>{"Цена: ".toUpperCase()}</p>
          <p>{cost} руб</p>
          <img src="/common/plus.svg" alt="plusSvg" className={style.plusSvg} />
        </div>
      </>
    </div>
  );
};

export default Favorite;
