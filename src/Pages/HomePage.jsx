import React from "react";
import style from "./HomePage.module.scss";
import Card from "../Components/Card";

const HomePage = ({
  items,
  addInCart,
  addToFavorites,
  // itemInCart,
  isLoading,
}) => {
  const [searchValue, setSearchValue] = React.useState("");

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const renderItems = () => {
    return isLoading
      ? [...Array(8)]
      : items
          .filter((names) =>
            names.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((obj) => (
            <Card
              key={obj.id}
              /* added={itemInCart.some(
                (objICart) => parseInt(objICart.id) === parseInt(obj.id)
              )} */
              onFavorite={({ id, title, cost, imageUrl }) => {
                addToFavorites({ id, title, cost, imageUrl });
              }}
              onPlus={({ id, title, cost, imageUrl }) => {
                addInCart({ id, title, cost, imageUrl });
              }}
              {...obj}
            />
          ));
  };
  return (
    <div>
      <div className={style.above}>
        {searchValue ? <h1>{"Поиск: " + searchValue}</h1> : <h1>Главная</h1>}
        <div className={style.searchBlock}>
          <img src="/common/search.svg" alt="search" />
          <input
            type="text"
            placeholder="Поиск..."
            value={searchValue}
            onChange={onChangeSearch}
          />
          {searchValue && (
            <img
              src="/common/krest.png"
              alt="close"
              onClick={() => setSearchValue("")}
              className={style.clearInput}
            />
          )}
        </div>
      </div>
      <div className={style.content}>{renderItems()}</div>
    </div>
  );
};

export default HomePage;
