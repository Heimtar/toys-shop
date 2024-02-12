import React from "react";
import style from "./Card.module.scss";
import MyLoader from "../../utility/Skeleton";
import AppContext from "../../context";

const Card = ({
  id,
  title,
  cost,
  imageUrl,
  onPlus,
  onFavorite,
  // added = false,
  
}) => {
  // const [isAdded, setIsAdded] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const {isLoading, isItemAdded} = React.useContext(AppContext)

  const onClickPlus = ({ id, title, cost, imageUrl }) => {
    // setIsAdded(!isAdded);
    onPlus({ id, title, cost, imageUrl });
  };

  const onClickFavorite = ({ id, title, cost, imageUrl }) => {
    setIsFavorite(!isFavorite);
    onFavorite({ id, title, cost, imageUrl });
  };

  return (
    <div className={style.mainCard}>
      {isLoading ? (
        <MyLoader />
      ) : (
        <>
          <img
            onClick={() => {
              onClickFavorite({ id, title, cost, imageUrl });
            }}
            src={
              isFavorite ? "/common/favoriteheart.svg" : "/common/favorite.svg"
            }
            alt="favorite"
            className={style.favoriteSvg}
          />
          <img src={imageUrl} alt="imgCardItem" className={style.imgCardItem} />
          <>
            <h3>{title}</h3>
            <div className={style.cost}>
              <p>{"Цена: ".toUpperCase()}</p>
              <p>{cost} руб</p>
              <img
                onClick={() => onClickPlus({ id, title, cost, imageUrl })}
                src={isItemAdded(id) ? "/common/check.png" : "/common/plus.svg"}
                alt="plusSvg"
                className={style.plusSvg}
              />
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default Card;
