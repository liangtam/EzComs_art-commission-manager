const messageReducer = (state, action) => {
    switch (action.type) {
        case 'errorUpdate':
            return {
                successMessage: "",
                errorMessage: "Could not update order.",
                loadingMessage: ""
            }
        case 'successUpdate':
            return {
                successMessage: "Order is updated.",
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
        default:
            console.log("Something went wrong");
    }
}


const ACTION = {
    ERROR_UPDATE: 'errorUpdate',
    ERROR_DELETE: 'errorDelete',
    LOADING: 'loading',
    SUCCESS_UPDATE: "successUpdate"
}

export  {messageReducer, ACTION};