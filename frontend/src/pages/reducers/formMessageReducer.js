const formMessageReducer = (state, action) => {
    switch (action.type) {
        case 'errorUpdate':
            return {
                successMessage: "",
                errorMessage: "Could not update form.",
                loadingMessage: ""
            };
        case 'successUpdate':
            return {
                successMessage: "Form is updated.",
                errorMessage: "",
                loadingMessage: ""
            };
        case 'successUpload':
            return {
                successMessage: "Form saved!",
                errorMessage: "",
                loadingMessage: ""
            };
        case 'successDelete':
            return {
                successMessage: "Form deleted!",
                errorMessage: "",
                loadingMessage: ""
            };
        case 'errorDelete':
            return {
                successMessage: "",
                errorMessage: "Could not delete form.",
                loadingMessage: ""
            };
        case 'errorUpload':
            return {
                successMessage: "",
                errorMessage: "Could not upload form.",
                loadingMessage: ""
            };
        case 'errorGetAll':
            return {
                successMessage: "",
                errorMessage: "Could not load forms.",
                loadingMessage: ""
            };
        case 'customError':
            return {
                successMessage: "",
                errorMessage: action.payload,
                loadingMessage: ""
            }
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
    ERROR_UPLOAD: 'errorUpload',
    ERROR_GET_ALL: 'errorGetAll',
    ERROR_CUSTOM: 'customError',
    LOADING: 'loading',
    SUCCESS_UPDATE: "successUpdate",
    SUCCESS_UPLOAD: "successUpload",
    SUCCESS_DELETE: "successDelete",
    RESET: "reset"
}

// const resetAfterSomeTime = (delay) => {
//     return (dispatch) => {
//         setTimeout(() => {
//             dispatch({type: ACTION.RESET});
//         }, delay);
//     };
// }

export  {formMessageReducer, ACTION};