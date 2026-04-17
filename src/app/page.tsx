"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  return (
    <Button size="lg" onClick={() => toast.success("yoooooo")}>
      Click ME
    </Button>
  );
}
