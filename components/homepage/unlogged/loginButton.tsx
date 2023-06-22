'use client'

import useRouter from "next/router";
import { useState } from "react";
import axios from "axios";

export default function LoginButton() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            // Make the Axios request to /api/login-request
            const response = await axios.get('/api/login-link');
            // Process the response if needed
            setIsLoading(false);
            // Redirect to the desired link
            router.push(response.data);
        } catch (error) {
            setIsLoading(false);
            console.error('An error occurred:', error);
        }
    };

    return (
        <button className="btn btn-primary" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Log in'}
        </button>)
}