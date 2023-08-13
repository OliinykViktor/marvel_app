import { useCallback, useState } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [msgError, setMsgError] = useState(false);

    const reguest = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        setLoading(true);

        try {
            const response = await fetch(url, { method, body, headers })
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            setLoading(false)
            return data
        } catch (error) {
            setLoading(false);
            setMsgError(error.message);
            throw error;
        }
    }, [])

    const clearError = useCallback(() => setMsgError(null), [])
    return {
        loading, msgError, reguest, clearError
    };
};

export default useHttp;