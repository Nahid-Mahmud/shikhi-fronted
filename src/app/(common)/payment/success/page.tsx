import PaymentSuccessPage from "@/components/PaymentSuccessPage";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <PaymentSuccessPage />
      </Suspense>
    </div>
  );
}
