const orderMessageReducer = (state, action) => {
    switch (action.type) {
        case 'errorUpdate':
            return {
                successMessage: "",
                errorMessage: "Could not update order.",
                loadingMessage: ""
            };
        case 'successUpdate':
            return {
                successMessage: "Order is updated.",
                errorMessage: "",
                loadingMessage: ""
            };
        case 'successUpload':
            return {
                successMessage: "Order submitted!",
                errorMessage: "",
                loadingMessage: ""
            };
        case 'errorDelete':
            return {
                successMessage: "",
                errorMessage: "Could not delete order.",
                loadingMessage: ""
            };
        case 'loading':
            return {
                successMessage: "",
                errorMessage: "",
                loadingMessage: "Loading..."
            };
        case 'reset':
            return {
                successMessage: "",
                errorMessage: "",
                loadingMessage: ""
            };
        default:
            console.log("Something went wrong");
    }
}


const ACTION = {
    ERROR_UPDATE: 'errorUpdate',
    ERROR_DELETE: 'errorDelete',
    LOADING: 'loading',
    SUCCESS_UPDATE: "successUpdate",
    SUCCESS_UPLOAD: "successUpload",
    RESET: "reset"
}

const resetAfterSomeTime = (delay) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({type: ACTION.RESET});
        }, delay);
    };
}

export  {orderMessageReducer, ACTION, resetAfterSomeTime};