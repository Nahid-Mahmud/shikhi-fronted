import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {" "}
      <Header />
      {children}
      <Footer />
    </div>
  );
}
