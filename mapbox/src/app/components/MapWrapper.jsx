'use client';  //  Mark as client component

import dynamic from 'next/dynamic';

// dynamically import the Map component
const Map = dynamic(() => import('./Map.jsx'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      Loading map...
    </div>
  ),
});

export default function MapWrapper() {
  return <Map />;
} 