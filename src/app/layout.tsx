import Header from "@/components/Header";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Guarantease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-[100vh] flex flex-col justify-between">
        <Header />
        <div className="p-12 flex flex-col gap-9 h-[calc(100vh-3rem-60px-1.5rem)]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
