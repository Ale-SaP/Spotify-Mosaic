"use client"

import { useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function Log() {
    const code = useSearchParams()?.get('code');
    const fetchData = async () => {
        if (code) {
            console.log('Received code:', code);
            try {
                const response = await axios.post('/api/login-handler/', { "code": code });
                console.log('Response:', response);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">Wait till we log you in!</p>
                </div>
            </div>
        </div>
    );
}
