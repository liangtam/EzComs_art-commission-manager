const AlertMessage = ({ message = '', alertType = 'error' }) => {
    if (alertType === 'error') {
        return <div className="bg-red-100 text-red-400 pad-3 radius-1">{message}</div>;
    } else if (alertType === 'success') {
        return <div className="bg-green-100 text-green-400 pad-3 radius-1">{message}</div>;
    }
};

export default AlertMessage;
