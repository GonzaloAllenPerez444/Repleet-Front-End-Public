import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean | null;
    checkAuth: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    

    const checkAuth = async () => {
        try {
            const response = await fetch(`${apiUrl}/pingauth`, {
                method: "GET",
            });
            if (response.status === 200) {
                
                setIsAuthenticated(true);
            } else {
                
                setIsAuthenticated(false);
            }
        } catch (error) {
            
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
