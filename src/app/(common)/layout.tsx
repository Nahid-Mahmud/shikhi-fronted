import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children} <Footer />
    </div>
  );
}
