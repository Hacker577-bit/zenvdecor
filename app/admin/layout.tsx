import AdminHeader from "@/components/AdminHeader";
import Footer from "@/components/Footer";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <AdminHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
