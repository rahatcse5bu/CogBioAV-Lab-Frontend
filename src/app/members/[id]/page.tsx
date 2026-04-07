'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function MemberProfile() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to members page as individual profiles are no longer available
    router.push('/members');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    </div>
  );
}
