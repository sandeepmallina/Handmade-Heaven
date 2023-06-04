import "./CheckoutProduct.css"
import React from 'react'
import { useStateValue } from "../StateProvider/StateProvider";
import { useUserStateValue } from "../SimpleStateProvider/UnameProvider";
import {MdOutlineDelete} from "react-icons/md"
function CheckoutProduct({ id, image, title, price, rating, hideButton,description }) {
  const[{basket},dispatch]=useStateValue();
  const{getItem,getCount}=useUserStateValue();
  const count=getCount(id);

 const addToBasket=()=>{
  //dispatch the item into to data layer
  dispatch({
    type:"ADD_TO_BASKET",
    item:{
      id:id,
      title:title,
      image:image,
      price:price,
      rating:rating,
      description:description
    } ,
  });
};
const RmeoveAllItems=()=>{
  for(let i=1; i<=count; i++) {
    removeBasket();
  }
}
const removeBasket =() =>{
  //remove the item from the basket
  dispatch({
    type:"REMOVE_FROM_BASKET",
    id:id,
  })
}
  const isPresent=getItem(id);
 
  return (

    <div className="chkot__product__continer">
    <img
      className="cProduct__img"
      src={image}
      alt=""
      srcset=""
    />
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
                <div className="checkout_button">
                
            {isPresent&&<div className='cart-bar'>
           <button onClick={removeBasket} className="decrement-btn">-</button>
           <p className='count-items'>{count}</p>
           <button onClick={addToBasket}  className="increment-btn">+</button>
           </div>
           }
           {!hideButton && (<button onClick={RmeoveAllItems} className="remove_button"><span><MdOutlineDelete size="2rem"/></span></button>)}
                </div>
    </div>
  </div>
  )
}

export default CheckoutProduct