import { SiteHeader } from "@/components/layout/SiteHeader";
import { DailyRewardProvider } from "@/components/providers/DailyRewardProvider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <DailyRewardProvider>
        <main>{children}</main>
      </DailyRewardProvider>
    </>
  );
}