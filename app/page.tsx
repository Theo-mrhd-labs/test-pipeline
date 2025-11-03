"use client";

import dynamic from "next/dynamic";

const Todo = dynamic(() => import("./todo"), { ssr: false });

export default function ClientHome() {
  return (
    <main>
      <Todo />
    </main>
  );
}
