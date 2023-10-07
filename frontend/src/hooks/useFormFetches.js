const useFormFetches = () => {
    const fetchAllForms = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/forms/', {
                // headers: {
                //     'Authentication': `Bearer ${user.token}`
                // }
            });

            const formsJson = await response.json();

            if (response.ok) {
                console.log('Fetched all forms in main page! ', formsJson);
                //findActiveForm();
            }
        } catch (error) {
            console.log('Error fetching all forms: ', error.message);
        }
    };

    return { fetchAllForms };
};

export { useFormFetches };
