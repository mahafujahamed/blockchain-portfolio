'use client';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) router.replace('/admin/dashboard');
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();
      localStorage.setItem('token', token);
      router.replace('/admin/dashboard');
    } catch (err: any) {
      setError(err.code || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <input type="email" placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} required className="input" />
      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} required className="input" />
      <button type="submit" className="btn">Login</button>
    </form>
  );
}
