import React, { useContext, useEffect, useState } from "react";
import "./Product.css";
import { useStateValue } from "../StateProvider/StateProvider";
import { AiFillStar } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { useUserStateValue } from "../SimpleStateProvider/UnameProvider";
function Product(props) {
  const productData = useNavigate();
  const [state, dispatch] = useStateValue();
  const [isAdding, setIsAdding] = useState(false);
  const {
    getItem,
    getCount,
    addToFavorites,
    getFavItem,
    favorites,
    removeFromFavorites,
  } = useUserStateValue();
  const isPresent = getItem(props.id);
  const count = getCount(props.id);
  // console.log("this is basket", basket);
  const addToBasket = () => {
    //dispatch the item into to data layer
    console.log(state.user);
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: props.id,
        title: props.title,
        image: props.image,
        price: props.price,
        rating: props.rating,
        description: props.description,
      },
    });
  };
  const removeBasket = () => {
    //remove the item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: props.id,
    });
  };
  const addToPreview = () => {
    // console.log(myProductcontext.userstate.username)
    productData(`/productinfo/${props.title}`, {
      state: {
        id: props.id,
        title: props.title,
        image: props.image,
        price: props.price,
        rating: props.rating,
      },
    });
  };
  const toggleFavorite = () => {
    if (favorites.some((favProduct) => favProduct.id === props.id)) {
      removeFromFavorites(props.id);
    } else {
      addToFavorites({
        id: props.id,
        title: props.title,
        image: props.image,
        price: props.price,
        rating: props.rating,
        description: props.description,
      });
    }
  };

  return (
    <div className="product-card">
      <div
        className="favourite-icon"
        style={{
          backgroundColor:
            favorites.some((favProduct) => favProduct.id === props.id) &&
            "#ffb9b9",
        }}
        onClick={toggleFavorite}
      >
        <GrFavorite size="1.2rem" />
      </div>
      <div className="product-image-container" onClick={addToPreview}>
        <img
          className="product-image"
          alt="product1"
          src={props.image}
          loading="lazy"
        />
      </div>
      <div className="product-content">
        <div className="product-title-wrap">
          <h3 class="product-name">{props.title}</h3>
          <p className="product-price">
            <small className="text-span">
              <BiRupee />
            </small>
            <strong>{props.price}</strong>
          </p>
        </div>
        <div class="product-description">{props.description}</div>
        <div className="product_rating">
          {Array(props.rating)
            .fill()
            .map((_, i) => (
              <p>
                <AiFillStar size="1.1rem" />
              </p>
            ))}
        </div>
        {/* <img  alt='product1' onClick={addToPreview}
          src={props.image}/> */}
        {!isPresent ? (
          <button onClick={addToBasket} className="add-to-cart-button">
            {" "}
            Add to Basket
          </button>
        ) : (
          <div className="cart-bar">
            <button onClick={removeBasket} className="decrement-btn">
              -
            </button>
            <p className="count-items">{count}</p>
            <button onClick={addToBasket} className="increment-btn">
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
