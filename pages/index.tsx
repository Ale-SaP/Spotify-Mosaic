import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Index() {
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
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">Please log in to Spotify.</p>
          <button className="btn btn-primary" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}
