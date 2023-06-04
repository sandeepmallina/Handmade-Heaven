export const initialState={
    basket:[],
    user:null
};
// https://reactjs.org/docs/hooks-reference.html#usereducer
export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => item.price + amount, 0);
const reducer=(state,action)=>{
    // console.log(action);
    switch(action.type){  
        case "ADD_TO_BASKET":
            // https://www.youtube.com/watch?v=O6P86uwfdR0&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=1
            return{
                //here state is used acces the previous state 

                ...state,basket:[...state.basket,action.item],
                //basket is updation variable
            }
        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
              );
              let newBasket = [...state.basket];
        
              if (index >= 0) {
                
                newBasket.splice(index, 1);
                //splice like slice takes the start index and count delete that element upto count
        
              } else {
                console.warn(
                  `Cant remove product (id: ${action.id}) as its not in basket!`
                )
              }
        
              return {
                ...state,
                basket: newBasket
              }
        case "SET_USER":
          return {
            ...state,
            user:action.user,
          }
        case "EMPTY_BASKET":
          return{
            ...state,basket:[]
          }
        default:
            return state;
    }
};

    ;
export default reducer;
