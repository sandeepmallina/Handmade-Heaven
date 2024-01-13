import React, { useContext, useState } from "react";
import { useStateValue } from "../StateProvider/StateProvider";
const UserContext = React.createContext();
//  const initialstate = {
//   username: "",
//   inCart:false,
// };

// export const reducer = (state, action) => {
//   switch (action.type) {
//     case "SET_USER":
//       return {
//         username: action.username1
//       };
//     case "SET_INCART":
//       return {
//         inCart:action.inCart
//       }
//     default:
//       return state;
//   }
// };

export function UnameProvider({ children }) {
  const [state] = useStateValue();
  const [userName, setUserName] = useState("");
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => [...prevFavorites, product]);
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((product) => product.id !== productId)
    );
  };
  function getFavItem(id) {
    return favorites.find((item) => item.id === id) ? true : false;
  }
  function getItem(id) {
    return state.basket.find((item) => item.id === id) ? true : false;
  }
  function getCount(id) {
    return state.basket.reduce(
      (count, item) => (item.id === id ? count + 1 : count),
      0
    );
  }
  function setUsername(username) {
    setUserName(username);
  }
  function getUniqueItems() {
    const uniqueItems = {};
    state.basket.forEach((item) => {
      if (!uniqueItems[item.id]) {
        uniqueItems[item.id] = { ...item, quantity: 1 };
      } else {
        uniqueItems[item.id].quantity++;
      }
    });

    return Object.values(uniqueItems);
  }

  return (
    <UserContext.Provider
      value={{
        getItem,
        setUsername,
        userName,
        getCount,
        getUniqueItems,
        favorites,
        addToFavorites,
        removeFromFavorites,
        getFavItem,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export const useUserStateValue = () => useContext(UserContext);
