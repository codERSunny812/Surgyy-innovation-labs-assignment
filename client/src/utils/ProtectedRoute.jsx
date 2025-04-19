import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/v1/patient-auth/verify-auth", {
                    method: "GET",
                    credentials: "include", // Include cookies
                });
                setIsAuthenticated(res.status === 200);
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    // Loading state
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // Not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    // Authenticated
    return <>{children}</>;
};

export default ProtectedRoute;
