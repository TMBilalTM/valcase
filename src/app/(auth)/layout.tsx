export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0f1923]">
      {/* Background Image / Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt5f80c0ec7596a59e/663d6b7f2025765933036263/VALORANT_Jett_Storm_1920x1080.jpg')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[420px] px-4">
        {children}
      </div>
    </div>
  );
}
