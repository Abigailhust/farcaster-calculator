"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const Calculator = dynamic(() => import("@/components/Calculator"), {
  ssr: false,
  loading: () => <div>Loading Calculator...</div>,
});

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Farcaster Mini Apps
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Calculator
              </Link>
              <Link 
                href="/morpho-transfers"
                className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                MORPHO Transfers
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="py-8">
        <Calculator />
      </main>
    </div>
  );
}
