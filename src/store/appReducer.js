const appReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_CART":
            return {
                ...state,
                cart: action.cart,
                subTotal: action.subTotal
            }
    }
}

export default appReducer;