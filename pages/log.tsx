import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Log() {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { code } = router.query;

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

    fetchData();
  }, [router.query]);

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
