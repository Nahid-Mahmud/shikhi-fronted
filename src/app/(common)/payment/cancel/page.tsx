"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-10 text-center shadow-lg space-y-6">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <XCircle className="h-10 w-10 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Payment Cancelled</h1>
          <p className="text-muted-foreground text-sm">
            No worries — your payment was not processed. You can go back and try again whenever you&apos;re ready.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Link
            href="/courses"
            className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
          >
            Browse Courses
          </Link>
          <Link
            href="/"
            className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl border font-medium hover:bg-secondary transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
