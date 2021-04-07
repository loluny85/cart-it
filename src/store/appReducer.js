const appReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_STATUS":
            return {
                ...state,
                loggedIn: action.loggedIn,
                userName: action.userName
            }
        case "UPDATE_CART":
            return {
                ...state,
                cart: action.cart,
                subTotal: action.subTotal
            }
        case "UPDATE_ADDRESS":
            return {
                ...state,
                address: action.address
            }
    }
}

export default appReducer;