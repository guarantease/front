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
      <body className="min-h-[100vh] h-max flex flex-col justify-between gap-8">
        <Header />
        <div className="p-12 flex flex-col gap-9 h-[max]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
