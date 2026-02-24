"use client";

import { useConfirmPaymentMutation } from "@/redux/features/payment/payment.api";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const [confirmPayment] = useConfirmPaymentMutation();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const confirmed = useRef(false); // prevent double-call in strict mode

  useEffect(() => {
    if (!sessionId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("error");
      setErrorMessage("No session ID found in URL.");
      return;
    }

    if (confirmed.current) return;
    confirmed.current = true;

    confirmPayment({ sessionId })
      .unwrap()
      .then(() => setStatus("success"))
      .catch((err: unknown) => {
        const e = err as { data?: { message?: string } };
        // "Already enrolled" is still a success
        if (e?.data?.message?.toLowerCase().includes("already enrolled")) {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage(e?.data?.message || "Could not confirm payment. Please contact support.");
        }
      });
  }, [sessionId, confirmPayment]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-10 text-center shadow-lg space-y-6">
        {/* Loading */}
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-16 w-16 animate-spin text-primary" />
            <h1 className="text-2xl font-bold">Confirming your payment…</h1>
            <p className="text-muted-foreground text-sm">
              Please wait while we complete your enrollment.
            </p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
                <CheckCircle2 className="relative h-16 w-16 text-green-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Payment Successful! 🎉</h1>
            <p className="text-muted-foreground text-sm">
              You are now enrolled. Your learning journey starts now!
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/student"
                className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
              >
                Go to My Dashboard
              </Link>
              <Link
                href="/courses"
                className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl border font-medium hover:bg-secondary transition"
              >
                Browse More Courses
              </Link>
            </div>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <XCircle className="mx-auto h-16 w-16 text-destructive" />
            <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
            <p className="text-muted-foreground text-sm">{errorMessage}</p>
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/courses"
                className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
              >
                Back to Courses
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
