const orderMessageReducer = (state, action) => {
    switch (action.type) {
        case 'errorGeneral':
            return {
                successMessage: '',
                errorMessage: 'Something went wrong.',
                loadingMessage: ''
            };
        case 'errorUpdate':
            return {
                successMessage: '',
                errorMessage: 'Could not update order.',
                loadingMessage: ''
            };
        case 'errorGetAll':
            return {
                successMessage: '',
                errorMessage: 'Could not load orders.',
                loadingMessage: ''
            };
        case 'errorUpload':
            return {
                successMessage: '',
                errorMessage: 'Could not submit order.',
                loadingMessage: ''
            };
        case 'successUpdate':
            return {
                successMessage: 'Order is updated.',
                errorMessage: '',
                loadingMessage: ''
            };
        case 'successUpload':
            return {
                successMessage: 'Order submitted!',
                errorMessage: '',
                loadingMessage: ''
            };
        case 'successDelete':
            return {
                successMessage: 'Order deleted!',
                errorMessage: '',
                loadingMessage: ''
            };
        case 'errorDelete':
            return {
                successMessage: '',
                errorMessage: 'Could not delete order.',
                loadingMessage: ''
            };
        case 'loading':
            return {
                successMessage: '',
                errorMessage: '',
                loadingMessage: 'Loading...'
            };
        case 'reset':
            return {
                successMessage: '',
                errorMessage: '',
                loadingMessage: ''
            };
        default:
            console.log('Something went wrong');
    }
};

const ACTION = {
    ERROR_GENERAL: 'errorGeneral',
    ERROR_UPDATE: 'errorUpdate',
    ERROR_DELETE: 'errorDelete',
    ERROR_UPLOAD: 'errorUpload',
    ERROR_GET_ALL: 'errorGetAll',
    LOADING: 'loading',
    SUCCESS_UPDATE: 'successUpdate',
    SUCCESS_UPLOAD: 'successUpload',
    SUCCESS_DELETE: 'successDelete',
    RESET: 'reset'
};

const resetAfterSomeTime = (delay) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({ type: ACTION.RESET });
        }, delay);
    };
};

export { orderMessageReducer, ACTION, resetAfterSomeTime };
