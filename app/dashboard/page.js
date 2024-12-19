'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      router.push(`/dashboard/${session.user.id}`);
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated' || !session?.user) {
    router.push('/login');
    return <p>Redirecting to login...</p>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      {session?.user ? (
        <>
          <p>Hello {session.user.name}, this is your admin page!</p>
          <p>Your email: {session.user.email}</p>
        </>
      ) : (
        <p>No user information found</p>
      )}
    </div>
  );
}
