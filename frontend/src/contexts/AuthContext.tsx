import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from 'firebase/auth';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import api from '../services/api';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signup: (email: string, password: string, name?: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setErrors] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signup = async (email: string, password: string, name?: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Register user in backend
            await api.post('/api/auth/signup', {
                email: result.user.email,
                name: name || '',
            });
            
        } catch (error: any) {
            console.error('Signup error:', error);
            // setErrors()
            throw error;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            // await signInWithEmailAndPassword(auth, email, password);

            // Verify with backend
            const response: any = await api.post('/api/auth/login');
            console.log(response.ok)

        } catch (error: any) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // Try to login first
            try {
                await api.post('/api/auth/login');
            } catch (error: any) {
                // If user doesn't exist, sign them up
                if (error.response?.status === 404) {
                    await api.post('/api/auth/signup', {
                        email: result.user.email,
                        name: result.user.displayName || '',
                    });
                } else {
                    throw error;
                }
            }
        } catch (error: any) {
            console.error('Google login error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error: any) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
