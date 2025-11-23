import { SiteHeader } from "@/components/layout/SiteHeader";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
    </>
  );
}
