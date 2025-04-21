import { Footer } from "./footer";
import { Navbar } from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-[#f4f4f4]">{children}</div>
      <Footer />
    </section>
  );
}
