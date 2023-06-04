import React,{useContext} from 'react'
import { useStateValue } from '../StateProvider/StateProvider'
import Subtotal from '../Subtotal-Compnents/Subtotal'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct'
import { useUserStateValue } from '../SimpleStateProvider/UnameProvider'

function Checkout() {
  const[{basket,user},dispatch]=useStateValue();
const {userName,getUniqueItems} =useUserStateValue();
const uniqueProducts=getUniqueItems();
  return (
    <div className='checkout'>
        <div className='checkout_left'>
            <img className='checkout_ad'
            src='https://martjackstorage.blob.core.windows.net/in-resources/2442cd87-594c-4870-80e6-f02ba6ec481f/Images/userimages/images/Handicraftss.jpg'
             alt=''/>
             <diV>
             <h3> Hello,{user? userName : 'Guest'}</h3>
            <h2 className='checkout_title'>
                Your shopping basket
            </h2>
            {console.log(uniqueProducts)}
            {uniqueProducts.map(item => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              description={item.description}
              quantaity={item.quantaity}
            />
          ))}
            
        </diV>
        </div>
        
        <div className='checkout_left'>
            <Subtotal/>
        </div>
    </div>
  )
}

export default Checkout