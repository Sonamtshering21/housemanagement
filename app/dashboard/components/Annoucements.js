'use client';
import React from 'react';
import { useSession } from 'next-auth/react';

const Announcements = () => {
  const { data: session, status } = useSession();

  // Safely get the user ID if session exists
  const userId = session?.user?.id;

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div>
      Announcements
      {session ? (
        <>
          <p>Hello {session.user.name}, this is your admin page!</p>
          <p>Your email: {session.user.email}</p>
          <p>{userId}</p>
        </>
      ) : (
        <p>No user information found</p>
      )}
    </div>
  );
};

export default Announcements;
