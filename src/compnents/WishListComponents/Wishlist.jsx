import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import { useUserStateValue } from "../SimpleStateProvider/UnameProvider";
import Product from "../Product-Components/Product";
import CheckoutProduct from "../Checkout-Components/CheckoutProduct";
import FavouriteProduct from "../Favourite-Components/FavouriteProduct";
export default function Wishlist() {
  const { favorites, removeFromFavorites } = useUserStateValue();
  return (
    <div className="main__heading">
      <h1>Favorite Products</h1>
      {favorites.length === 0 ? (
        <p>No favorite products selected.</p>
      ) : (
        <>
          {favorites.map((item) => (
            <FavouriteProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              description={item.description}
              quantaity={item.quantaity}
            />
          ))}
        </>
      )}
      {console.log("from wish list", favorites)}
    </div>
  );
}
