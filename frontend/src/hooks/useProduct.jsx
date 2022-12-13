import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useReducer, useEffect } from 'react';
import { StoreContext } from '../Store';
import axios from 'axios';
import { getError } from '../utils';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


const useProductScreen = () => {
    const navigate = useNavigate()
     const params = useParams();
     const { slug } = params;
   
     const [{ loading, error, product }, dispatch] = useReducer(reducer, {
       product: [],
       loading: true,
       error: '',
     });
   
     // const [products, setProducts] = useState([]);
     useEffect(() => {
       const fetchData = async () => {
         dispatch({ type: 'FETCH_REQUEST' });
         try {
           const result = await axios.get(`/api/products/slug/${slug}`);
           dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
         } catch (err) {
           dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
         }
       };
       fetchData();
     }, [slug]);
   
     const { state, dispatch: ctxDispatch } = useContext(StoreContext);
     const { cart } = state;
     console.log(cart)
    
     const addToCartHandler = async () => {
         const existItem = cart.cartItems.find((item) => item._id === product._id);
         const quantity = existItem ? existItem.quantity + 1 : 1;
         const { data } = await axios.get(`/api/products/id/${product._id}`);
         if (data.countInStock < quantity) {
           window.alert('Sorry. Product is out of stock');
           return;
       }
       ctxDispatch({
         type: 'CART_ADD_ITEM',
         payload: { ...product, quantity },
       });
       navigate('/cart')
     };
     
     return{
      product,
      cart
     }
    }

    export default useProductScreen