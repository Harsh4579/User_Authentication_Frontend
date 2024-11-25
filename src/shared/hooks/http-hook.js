import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false); // Fixed naming
    const [error, setError] = useState();
    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);

        try {
            // Ensure headers contain Content-Type if body exists
            // if (body && !headers['Content-Type']) {
            //     headers['Content-Type'] = 'application/json';
            // }

            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortController.signal,
            });

            const responseData=await response.json();
            // try {
            //     responseData = await response.json();
            // } catch (err) {
            //     responseData = null; // Handle non-JSON responses gracefully
            // }

            // Remove the abort controller from active requests
            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortController
            );

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setIsLoading(false);
            return responseData;
        } catch (err) {
            setError(err.message || 'Something went wrong!');
            setIsLoading(false);
            throw err;
        }
    }, []); // Added dependencies

    const clearError =() => {
        setError(null);
    }; // Wrapped in useCallback for consistency

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
};
