import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {dispatch, ACTION} = useAuthContext();

    const signUp = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const userObj = {email, password};
        // console.log(JSON.stringify(userObj))

        const response = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })

        const user = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(user.error);
            console.log("Sign up error: ", user.error)
        }

        if (response.ok) {
            // saving user to local storage
            localStorage.setItem('user', JSON.stringify(user));

            // update to auth context
            dispatch({type: ACTION.LOGIN, payload: user});

            setIsLoading(false);
        }
    }

    return {signUp, isLoading, error};

}
