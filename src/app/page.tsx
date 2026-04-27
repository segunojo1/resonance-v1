"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Resonance</h1>
        <p className="text-xl text-slate-300 mb-8">
          Fast, modern text-to-speech for teams. Create custom voices, generate natural speech, ship voice content.
        </p>

        {!user ? (
          <div className="flex gap-4 justify-center">
            <Link href="/sign-in">
              <Button size="lg">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button size="lg" variant="outline">
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 justify-center items-center">
            <Link href="/text-to-speech">
              <Button size="lg">Go to App</Button>
            </Link>
            <UserButton />
          </div>
        )}
      </div>
    </main>
  );
}
