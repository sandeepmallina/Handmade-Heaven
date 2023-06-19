import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import { useUserStateValue } from "../SimpleStateProvider/UnameProvider";
function FavouriteProduct({ id, image, title, price, rating, description }) {
  const { favorites, removeFromFavorites } = useUserStateValue();
  return (
    <div className="chkot__product__continer">
      <img className="cProduct__img" src={image} alt="" srcset="" />
      <div className="cProduct__info">
        <h1>{title}</h1>
        <p>{description}</p>
        <p className="checkoutProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        <button
          onClick={() => {
            removeFromFavorites(id);
          }}
          className="remove_button"
        >
          <span>
            Remove
            <MdOutlineDelete size="2rem" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default FavouriteProduct;
