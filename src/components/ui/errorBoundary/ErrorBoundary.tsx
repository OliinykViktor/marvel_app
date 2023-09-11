import React, { useState, useEffect } from "react";

import ErrorMessage from "../errorMessage/ErrorMessage";

import './ErrorBoundary.scss';

function ErrorBoundary(props: React.PropsWithChildren<{}>) {
    const [error, setError] = useState(false);

    useEffect(() => {
        const componentDidCatch = (error: ErrorEvent) => {
            setError(true);
        };

        window.addEventListener("error", componentDidCatch);

        return () => {
            window.removeEventListener("error", componentDidCatch);
        };
    }, []);

    if (error) {
        return (
            <div className="boundary_error">
                <h2>On site are conducted technical works</h2>
                <ErrorMessage />
            </div>
        );
    }

    return <>{props.children}</>;
}

export default ErrorBoundary;
