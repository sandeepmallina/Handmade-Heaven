import React from "react";
import "./ProductPreview.css";
import { useStateValue } from '../StateProvider/StateProvider'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GiDeliveryDrone, GiTakeMyMoney } from "react-icons/gi";
import { AiFillCreditCard } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
function ProductPreview() {
  const history = useNavigate();
  const productData = useLocation();
  const[state,dispatch]=useStateValue();
  const addToBasket=()=>{
    //dispatch the item into to data layer
    console.log(state.user);
    dispatch({
      type:"ADD_TO_BASKET",
      item:{
        id:productData.state.id,
        title:productData.state.title,
        image:productData.state.image,
        price:productData.state.price,
        rating:productData.state.rating,
      } ,
    });
  };
  return (
    <div className="prduct_conatiner">
      <button
        className="back_btn"
        onClick={() => {
          history("/");
        }}
      >
        <AiOutlineArrowLeft />
        Back Home
      </button>
      {(() => {
        try {
          /* Try to access Data.state.id */
          return (
            <>
              <h1 className="product_preview_header">Product Details</h1>
              <article className="product_preview_card">
                <div className="product_image_conatiner">
                  <img
                    className="product_preview_image"
                    src={productData.state.image}
                    alt={productData.state.title}
                  />
                </div>
                <div className="product_details">
                  <h1 className="product_detail_header">
                    {productData.state.title}
                  </h1>
                  <p className="product_detail_description">
                    {productData.state.description}These unique pieces offer a
                    beautiful blend of the old and new, and their rustic charm
                    can provide a cozy and inviting atmosphere. Whether you're
                    looking to enhance the beauty of your home or simply looking
                    for an eye-catching statement piece, a handcrafted
                    traditional design is a great option. With their attention
                    to detail and high-quality craftsmanship, these pieces are
                    not only beautiful, but also durable and built to last. They
                    offer a perfect way to bring a touch of history and
                    tradition into the modern world of interior design.
                  </p>
                  <div className="delivery_conatiner">
                    <h3>Delivery Options</h3>
                    <div className="delivery_options">
                      <GiDeliveryDrone size="3rem" title="Drone Delivery" />
                      <GiTakeMyMoney size="3rem" title="Cash On Delivery" />
                      <AiFillCreditCard size="3rem" title="Online payment" />
                    </div>
                  </div>
                  <h2 className="product_detail_price">
                    <small className="text-span">
                      <BiRupee />
                    </small>
                    {productData.state.price}
                  </h2>
                  <button className="product_detail_AddTocart" onClick={addToBasket}>
                    <BsCart4 size="2rem" />
                    Add to Cart
                  </button>
                </div>
              </article>
            </>
          );
        } catch (error) {
          /* Handle the error */
          return <p>Unable to retrieve passed data</p>;
        }
      })()}
      {/* {Object.keys(productData.state).map((key) => (
        <div key={key}>
          <span>{key}:</span> {productData.state[key]}
        </div>
      ))} */}
    </div>
  );
}

export default ProductPreview;
