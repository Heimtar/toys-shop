import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import HomePage from "./Pages/HomePage";
import FavoritesPage from "./Pages/FavoritesPage";
import PageNotFound from "./Pages/PageNotFound";
import axios from "axios";
import Orders from "./Pages/Orders";
import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [itemInCart, setItemInCart] = React.useState([]);
  const [itemInFavorites, setItemInFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [itemsInOrder, setItemInOrder] = React.useState([]);
  const [itemsInOrderReduse, setItemInOrderReduse] = React.useState([]);

  React.useEffect(() => {
    async function axiData() {
      const cartResponse = await axios.get("https://test-api-xih4.onrender.com/cart");
      const favoritesResponse = await axios.get(
        "https://test-api-xih4.onrender.com/favorites"
      );
      const itemsResponse = await axios.get("https://test-api-xih4.onrender.com/items");
      const orderResponse = await axios.get("https://test-api-xih4.onrender.com/orders");

      setIsLoading(false);
      setItemInCart(cartResponse.data);
      setItemInFavorites(favoritesResponse.data);
      setItemInOrder(orderResponse.data);
      setItemInOrderReduse(
        orderResponse.data.reduce((prev, obj) => [...prev, ...obj.items], [])
      );

      setItems(itemsResponse.data);
    }
    axiData();
  }, []);
  const addInCart = ({ id, title, cost, imageUrl }) => {
    if (itemInCart.find((item) => parseInt(item.id) === parseInt(id))) {
      axios.delete(`http://localhost:3001/cart/${id}`);
      setItemInCart((prev) =>
        prev.filter((items) => parseInt(items.id) !== parseInt(id))
      );
    } else {
      axios.post("http://localhost:3001/cart", {
        id,
        title,
        cost,
        imageUrl,
      });
      setItemInCart((prev) => [...prev, { id, title, cost, imageUrl }]);
    }
  };

  const addToFavorites = ({ id, title, cost, imageUrl }) => {
    if (itemInFavorites.find((favObj) => favObj.id === id)) {
      axios.delete(`http://localhost:3001/favorites/${id}`);
      setItemInFavorites((prev) => prev.filter((item) => item.id !== id));
    } else {
      axios.post("http://localhost:3001/favorites", {
        id,
        title,
        cost,
        imageUrl,
      });
      setItemInFavorites((prev) => [...prev, { id, title, cost, imageUrl }]);
    }
  };

  const onRemoveFromCart = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`);

    setItemInCart((prev) => prev.filter((item) => item.id !== id));
  };

  const isItemAdded = (id) => {
    return itemInCart.some(
      (objICart) => parseInt(objICart.id) === parseInt(id)
    );
  };
  return (
    <div className="wrapper">
      <AppContext.Provider
        value={{
          isLoading,
          itemInFavorites,
          itemInCart,
          isItemAdded,
          itemsInOrder,
          itemsInOrderReduse,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                itemInCart={itemInCart}
                onRemoveFromCart={onRemoveFromCart}
                setItemInCart={setItemInCart}
              />
            }
          >
            <Route
              index
              element={
                <HomePage
                  items={items}
                  itemInCart={itemInCart}
                  addInCart={addInCart}
                  addToFavorites={addToFavorites}
                  isLoading={isLoading}
                />
              }
            />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
