import React from "react";
import Favorite from "./../Components/Favorite";
import style from "./../Components/Favorite/Favorite.module.scss";
import AppContext from "../context";

const FavoritesPage = () => {
  const {itemInFavorites} = React.useContext(AppContext)
  return (
    <>
      <h1 className={style.insideH1}>Избранные</h1>
      <div className={style.mainFavorite}>
        {itemInFavorites.map((obj) => (
          <Favorite
            key={obj.id}
            imageUrl={obj.imageUrl}
            {...obj}
          />
        ))}
      </div>
    </>
  );
};

export default FavoritesPage;
