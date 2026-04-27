"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Mic, Zap, Shield } from "lucide-react";

export default function Home() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">Resonance</div>
          <div className="flex items-center gap-4">
            {user && <UserButton />}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Custom voices,
            <br />
            <span className="text-primary">effortless speech.</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Build a voice library, generate natural-sounding speech. Built for product teams that ship voice experiences.
          </p>

          <div className="flex gap-4 justify-center mb-16">
            {!user ? (
              <>
                <Link href="/sign-in">
                  <Button size="lg" className="rounded-lg">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="lg" variant="outline" className="rounded-lg">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/text-to-speech">
                <Button size="lg" className="rounded-lg">
                  Go to App
                </Button>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-left">
              <div className="w-12 h-12 rounded-lg bg-accent mb-4 flex items-center justify-center">
                <Mic className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Record or Upload</h3>
              <p className="text-sm text-muted-foreground">
                Create custom voices from audio samples. Upload or record right in your browser.
              </p>
            </div>

            <div className="text-left">
              <div className="w-12 h-12 rounded-lg bg-accent mb-4 flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Generate Instantly</h3>
              <p className="text-sm text-muted-foreground">
                Turn text into high-quality speech with fine control over tone and delivery.
              </p>
            </div>

            <div className="text-left">
              <div className="w-12 h-12 rounded-lg bg-accent mb-4 flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Secure & Scalable</h3>
              <p className="text-sm text-muted-foreground">
                Multi-tenant architecture. Your voices, your data, your control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 Resonance. Ship voice experiences.</p>
        </div>
      </footer>
    </main>
  );
}
