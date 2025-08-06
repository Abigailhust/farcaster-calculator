"use client";

import dynamic from "next/dynamic";

const Calculator = dynamic(() => import("@/components/Calculator"), {
  ssr: false,
  loading: () => <div>Loading Calculator...</div>,
});

export default function App() {
  return <Calculator />;
}
