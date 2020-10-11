import { REQUESTING_CART, REQUEST_CART_SUCCESSFUL, REQUESTING_CART_FAILED } from '../actiontypes/cartTypes'

const initalState = {
    response = {
        message="",
        status=""
    },
    isProcessing = false
}

export const addToCart = (state=initalState, action)=>{
    switch(action.type){
        case REQUESTING_CART: 
        return{
            ...state, 
            isProcessing=true
        }
        case REQUEST_CART_SUCCESSFUL:
            return{
                ...state, 
                response = {
                    message = action.payload.data,
                    statusCode = action.payload.statusCode       
                }
            }
        case REQUESTING_CART_FAILED: 
            return{
                ...state, 
                response = {
                    message = action.payload.data,
                    statusCode = action.payload.statusCode       
                }
            }
        default:
            return {...state}
    }
}