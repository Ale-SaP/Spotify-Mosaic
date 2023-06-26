"use client"

import { useRouter } from 'next/navigation'
import { useState } from "react";

interface LoginButtonProps {
  link: string;
}

export default function LoginButton({ link }: LoginButtonProps) {

  const router = useRouter()
  const [isLoading] = useState(false);

  const handleLogin = async () => {
    try {
      router.push(link);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleLogin} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Log in'}
    </button>
  );
}
