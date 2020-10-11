import { REQUESTING_CART, REQUEST_CART_SUCCESSFUL, REQUESTING_CART_FAILED } from '../actiontypes/cartTypes'
import axios from 'axios';

const requestingCart = ()=>({
    type:REQUESTING_CART
})

const requestingCartSuccessful = (data, statusCode) =>({
    type:REQUEST_CART_SUCCESSFUL,
    payload:{
        data,
        statusCode
    }
})

const  requestingCartFailed = (data, statusCode)=>({
    type:REQUESTING_CART_FAILED,
    payload:{
        data,
        statusCode
    }
})


export const requestCart = (token, bookStoreURI)=>{
    console.log(bookStoreURI)
    return (dispatch)=>{
        axios.get(bookStoreURI,{headers:{"x-token":token}})
        .then(res=>console.log(res))
        .catch(res=>console.log(res.response))            
    }
} 