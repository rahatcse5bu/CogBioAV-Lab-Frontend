'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MyProfilePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to members page as individual profiles are no longer available
    router.push('/members');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
